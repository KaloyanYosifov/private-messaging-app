/**
 * External dependencies.
 */
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Layout, Spinner } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
/**
 * Internal dependencies.
 */
import styles from './styles';

import Chat from '@/components/chat';
import { UserData } from '@/interfaces/UserData';
import { getUserData } from '@/store/authentication/getters';
import { useChatMessages, useMessagingSocket } from '@/pages/conversation/hooks';
import TopNavigation from '@/features/conversation/components/top-navigation';
import Messages from '@/client/messages';
import TypingIndicator from '@/components/typing-indicator';
import { MessageData } from '@/interfaces/messaging/MessageData';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';

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
    const [messages, setMessages, loading, firstLoading, loadMessages, hasMorePages] = useChatMessages(conversationId);
    const onReceivedMessage = (messages: MessageData[]) => {
        setMessages(
            (previousMessages) => GiftedChat.prepend(previousMessages, convertMessagesToIMessages(messages)),
        );
    };
    const [typing, onTextChange] = useMessagingSocket(`conversation.message.created.${conversationId}`, getUserData.id, onReceivedMessage);

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

    const isLoading = loading && !firstLoading;

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
                                renderChatFooter={() => (<TypingIndicator isTyping={typing} />)}
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
