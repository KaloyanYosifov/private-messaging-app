/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Conversation = ({ route }: { route: any }): React.ReactFragment => {
    const [messages, setMessages] = useState<IMessage[]>();
    const conversation = route.params.conversation;

    const onSend = (newMessages: IMessage[]) => {
        setMessages(GiftedChat.append(messages, newMessages));
    };

    return (
        <Layout style={styles.container}>
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={{
                    _id: 1,
                }}
            />
        </Layout>
    );
};

export default Conversation;
