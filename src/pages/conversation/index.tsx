/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Spinner } from '@ui-kitten/components';
import { GiftedChat } from 'react-native-gifted-chat';
/**
 * Internal dependencies.
 */
import styles from './styles';

import Chat from '@/components/chat';
import MessagesClient from '@/client/messages-client';
import { UserData } from '@/interfaces/UserData';
import FileHandler from '@/utils/FileHandler';
import { getUserData } from '@/store/authentication/getters';
import { useChatMessages, useMessagingSocket } from '@/pages/conversation/hooks';
import TopNavigation from '@/features/conversation/components/top-navigation';
import TypingIndicator from '@/components/typing-indicator';
import { MessageData } from '@/interfaces/messaging/MessageData';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';
import InputToolbar from '@/features/conversation/components/input-toolbar';
import CustomMessageView from '@/features/conversation/components/custom-message-view';
import { EnhancedIMessage } from '@/interfaces/messaging/EnhancedIMessage';
import { navigation } from '@/router';

interface ConversationProps {
    route: any,
    getUserData: UserData,
}

const renderLoading = () => (
    <Layout style={[styles.container, styles.isLoading]}><Spinner size="giant" /></Layout>
);

const messageClient = new MessagesClient();

const Conversation = ({ route, getUserData }: ConversationProps): React.ReactFragment => {
    const userName = route.params.userName;
    const conversationId = route.params.conversationId;
    const chatRef = useRef(null);
    const [listHeight, setListHeight] = useState(0);
    const [canScroll, setCanScroll] = useState(false);
    const [state, setMessages, loadMessages] = useChatMessages(conversationId);
    const isLoading = state.loading && !state.firstLoading;

    // methods
    const onReceivedMessage = useCallback((messages: MessageData[]) => {
        setMessages(
            (previousMessages) => GiftedChat.prepend(previousMessages, convertMessagesToIMessages(messages)),
        );

        if (chatRef.current && canScroll) {
            setTimeout(() => {
                chatRef.current.scrollToBottom();
            }, 100);
        }
    }, [canScroll, chatRef.current, setMessages]);
    const [typing, onTextChange] = useMessagingSocket(`conversation.message.created.${conversationId}`, getUserData.id, onReceivedMessage);

    const onSend = useCallback((newMessages: EnhancedIMessage[], scrollToBottom: () => void) => {
        // remove the duration of the new messages
        // as they in the url we hold the local audio file
        // and if we remove the duration we are going to load the audio file
        // immediately, and it will stay in memory, so we do not have to worry
        // if the user can hear the audio if we delete the audio file from local after we
        // store it in our server
        const formattedNewMessages: EnhancedIMessage[] = newMessages.map((message) => {
            if (message.attachment) {
                return {
                    ...message,
                    attachment: {
                        url: message.attachment.url,
                    },
                } as EnhancedIMessage;
            }

            return message;
        });
        setMessages((previousMessages) => GiftedChat.prepend(previousMessages, formattedNewMessages));
        setTimeout(() => { scrollToBottom(); }, 100);

        const newMessage = newMessages[0];

        if (newMessage.attachment) {
            void messageClient.uploadAudio(newMessage.attachment.url, newMessage.attachment.duration_in_seconds, conversationId)
                .then(() => {
                    if (!newMessage.attachment) {
                        return;
                    }

                    void FileHandler.delete(newMessage.attachment.url);
                });
        }

        if (newMessage.text) {
            void messageClient.send(newMessage.text, conversationId);
        }
    }, [setMessages]);

    const onRefresh = useCallback(() => {
        if (!state.hasMorePages) {
            return;
        }

        loadMessages();
    }, [loadMessages, state.hasMorePages]);

    const onScroll = useCallback((event: any) => {
        const MAX_OFFSET_FOR_THE_ABILITY_TO_SCROLL_TO_BOTTOM = 800;

        if (listHeight - event.nativeEvent.contentOffset.y > MAX_OFFSET_FOR_THE_ABILITY_TO_SCROLL_TO_BOTTOM) {
            setCanScroll(false);
            return;
        }

        setCanScroll(true);
    }, [listHeight]);

    const onContentSizeChange = useCallback((_, height: number) => {
        setListHeight(height);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            navigation().navigate('VideoChatModal');
        }, 3000);
    }, []);

    return (
        <Layout style={{ flex: 1 }}>
            <TopNavigation title={userName} />

            <Layout style={[styles.container, isLoading ? styles.isLoading : {}]}>
                {
                    isLoading
                        ?
                        <Spinner size="giant" />
                        :
                        (<>
                            <Chat
                                ref={chatRef}
                                listViewProps={{ onRefresh, refreshing: state.loading, onScroll, onContentSizeChange }}
                                inverted={false}
                                scrollToBottom={false}
                                onSend={onSend}
                                messages={state.messages}
                                renderLoading={renderLoading}
                                onInputTextChanged={onTextChange}
                                renderChatFooter={() => (<TypingIndicator isTyping={typing} />)}
                                renderCustomView={(props) => <CustomMessageView {...props} />}
                                renderInputToolbar={(props) => <InputToolbar {...props} />}
                                user={{
                                    _id: getUserData.id,
                                }}
                            />
                        </>)
                }
            </Layout>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    getUserData: getUserData(state),
});

export default connect(mapStateToProps)(Conversation);
