/**
 * External dependencies.
 */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Layout } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { UserData } from '@/interfaces/UserData';
import { getUserData } from '@/store/authentication/getters';
import { useChatMessages } from '@/pages/conversation/hooks';
import Loader from '@/features/conversation/components/loader';

interface ConversationProps {
    route: any,
    getUserData: UserData,
}

const Conversation = ({ route, getUserData }: ConversationProps): React.ReactFragment => {
    const conversationId = route.params.conversationId;
    const [messages, setMessages, loading, hasMorePages] = useChatMessages(conversationId);

    const onSend = (newMessages: IMessage[]) => {
        setMessages(GiftedChat.append(messages, newMessages));
    };

    return (
        <Layout style={[styles.container, loading ? styles.isLoading : {}]}>
            {
                loading
                    ?
                    <Loader />
                    :
                    <GiftedChat
                        onSend={onSend}
                        messages={messages}
                        user={{
                            _id: getUserData.id,
                        }}
                    />
            }
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    getUserData: getUserData(state),
});

export default connect(mapStateToProps)(Conversation);
