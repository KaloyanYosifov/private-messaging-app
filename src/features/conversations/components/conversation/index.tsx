/**
 * External dependencies.
 */
import React, { ReactFragment } from 'react';
import { ImageStyle } from 'react-native';
import { Icon, ListItem } from '@ui-kitten/components';
import formatDistance from 'date-fns/formatDistance';

/**
 * Internal dependencies.
 */
import styles from './styles';
import { navigation } from '@/router';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

interface ConversationProps {
    conversation: ConversationData,
}

const Conversation = ({ conversation }: ConversationProps): ReactFragment => {
    const user = conversation.users[0];
    let description = '';

    if (conversation.last_message) {
        const { last_message: lastMessage } = conversation;
        description = `- ${formatDistance(new Date(lastMessage.created_at), new Date())}`;

        if (!lastMessage.text && lastMessage.audio_url) {
            description = 'audio ' + description;
        } else {
            description = lastMessage.text + ' ' + description;
        }
    } else {
        description = 'New message';
    }

    const onPress = () => {
        navigation().navigate('Conversation', {
            conversationId: conversation.id,
            userName: user.name,
        });
    };

    return (
        <ListItem
            title={user.name}
            description={description}
            icon={(style: ImageStyle) => <Icon {...style} width={32} height={32} name="person" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            onPress={onPress}
        />
    );
};

export default Conversation;
