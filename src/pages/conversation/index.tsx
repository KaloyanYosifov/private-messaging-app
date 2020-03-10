/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Channel } from 'laravel-echo/src/channel/channel';
import debounce from 'lodash.debounce';
/**
 * Internal dependencies.
 */
import styles from './styles';

import Chat from '@/components/chat';
import { UserData } from '@/interfaces/UserData';
import { getUserData } from '@/store/authentication/getters';
import { useChatMessages } from '@/pages/conversation/hooks';
import TopNavigation from '@/features/conversation/components/top-navigation';
import Messages from '@/client/messages';
import { getSocket } from '@/helpers/socket';
import { MessageData } from '@/interfaces/messaging/MessageData';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';
import TypingIndicator from '@/components/typing-indicator';

interface ConversationProps {
    route: any,
    getUserData: UserData,
}

const renderLoading = () => (
    <Layout style={[styles.container, styles.isLoading]}><Spinner size="giant" /></Layout>
);

const messageClient = new Messages();

const Conversation = ({ route, getUserData }: ConversationProps): React.ReactFragment => {
    const conversationId = route.params.conversationId;
    const userName = route.params.userName;
    const channel = useRef<Channel | null>(null);
    const [typing, setTyping] = useState<boolean>(true);
    const [messages, setMessages, loading, firstLoading, loadMessages, hasMorePages] = useChatMessages(conversationId);

    const onSend = useCallback((newMessages: IMessage[], scrollToBottom: () => void) => {
        setMessages((previousMessages) => GiftedChat.prepend(previousMessages, newMessages));
        setTimeout(() => { scrollToBottom(); }, 50);

        messageClient.send(newMessages[0].text, conversationId);
    }, []);

    const onRefresh = useCallback(() => {
        if (!hasMorePages) {
            return;
        }

        loadMessages();
    }, [hasMorePages, loadMessages]);

    const stopTyping = useCallback(debounce(() => {
        if (!channel.current) {
            return;
        }

        channel.current.whisper('typing', {
            typing: false,
        });
    }, 300), [channel.current]);

    const onTextChange = useCallback(() => {
        if (!channel.current) {
            return;
        }

        channel.current.whisper('typing', {
            typing: true,
        });

        stopTyping();
    }, [channel.current]);

    const isLoading = loading && !firstLoading;

    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            return;
        }

        channel.current = socket.private(`conversation.message.created.${conversationId}`)
            .listen('.message.created.event', ({ message }: { message: MessageData }) => {
                if (message.user.id === getUserData.id) {
                    return;
                }

                setMessages(
                    (previousMessages) => GiftedChat.prepend(previousMessages, convertMessagesToIMessages([message])),
                );
            })
            .listenForWhisper('typing', (e) => {
                console.log(e.typing);
                setTyping(e.typing);
            });

        return () => {
            socket.leave(`conversation.message.created.${conversationId}`);
        };
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
                                listViewProps={{ onRefresh, refreshing: loading }}
                                inverted={false}
                                scrollToBottom={false}
                                onSend={onSend}
                                messages={messages}
                                renderLoading={renderLoading}
                                onInputTextChanged={onTextChange}
                                renderChatFooter={() => (<TypingIndicator isTyping={true} />)}
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
