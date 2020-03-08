/**
 * External dependencies.
 */
import React, { useCallback, useEffect } from 'react';
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
import { useChatMessages } from '@/pages/conversation/hooks';
import TopNavigation from '@/features/conversation/components/top-navigation';
import Messages from '@/client/messages';
import { getSocket } from '@/helpers/socket';

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

    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            return;
        }
        socket.private(`conversation.message.created.${conversationId}`)
            .listen('message.created.event', (e) => {
                console.log(e);
            });
    });

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
