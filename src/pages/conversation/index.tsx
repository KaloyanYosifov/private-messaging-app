/**
 * External dependencies.
 */
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Spinner } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
/**
 * Internal dependencies.
 */
import styles from './styles';

import Chat from '@/components/chat';
import Messages from '@/client/messages';
import { UserData } from '@/interfaces/UserData';
import { getUserData } from '@/store/authentication/getters';
import { useChatMessages, useMessagingSocket } from '@/pages/conversation/hooks';
import TopNavigation from '@/features/conversation/components/top-navigation';
import TypingIndicator from '@/components/typing-indicator';
import { MessageData } from '@/interfaces/messaging/MessageData';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';
import SendButton from '@/features/conversation/components/send-button';
import TextField from '@/features/conversation/components/text-field';

interface ConversationProps {
    route: any,
    getUserData: UserData,
}

const renderLoading = () => (
    <Layout style={[styles.container, styles.isLoading]}><Spinner size="giant" /></Layout>
);

const messageClient = new Messages();

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
            }, 50);
        }
    }, [canScroll, chatRef.current, setMessages]);
    const [typing, onTextChange] = useMessagingSocket(`conversation.message.created.${conversationId}`, getUserData.id, onReceivedMessage);

    const onSend = useCallback((newMessages: IMessage[], scrollToBottom: () => void) => {
        setMessages((previousMessages) => GiftedChat.prepend(previousMessages, newMessages));
        setTimeout(() => { scrollToBottom(); }, 100);

        messageClient.send(newMessages[0].text, conversationId);
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
                                renderComposer={(props) => <TextField {...props} />}
                                renderSend={(props) => <SendButton {...props} />}
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
