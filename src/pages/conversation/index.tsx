/**
 * External dependencies.
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Layout } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import styles from './styles';
import { getUserData } from '@/store/authentication/getters';
import { UserData } from '@/interfaces/UserData';
import Messages from '@/client/messages';

interface ConversationProps {
    route: any,
    getUserData: UserData,
}

const messagesClient = new Messages();

const Conversation = ({ route, getUserData }: ConversationProps): React.ReactFragment => {
    const [messages, setMessages] = useState<IMessage[]>();
    const conversationId = route.params.conversationId;

    useEffect(() => {
        messagesClient.paginate(1, conversationId)
            .then(response => {

            });
    }, []);

    const onSend = (newMessages: IMessage[]) => {
        setMessages(GiftedChat.append(messages, newMessages));
    };

    return (
        <Layout style={styles.container}>
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={{
                    _id: getUserData.id,
                }}
            />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    getUserData: getUserData(state),
});

export default connect(mapStateToProps)(Conversation);
