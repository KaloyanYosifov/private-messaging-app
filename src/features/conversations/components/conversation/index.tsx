/**
 * External dependencies.
 */
import get from 'lodash.get';
import React, { ReactFragment } from 'react';
import { Icon, ListItem } from '@ui-kitten/components';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

/**
 * Internal dependencies.
 */
import styles from './styles';

interface ConversationProps {
    conversation: ConversationData,
};

const Conversation = ({ conversation }: ConversationProps): ReactFragment => {
    const user = conversation.users[0];

    return (
        <ListItem
            title={user.name}
            description={get(conversation, 'last_message.text', 'New message')}
            icon={(style) => <Icon {...style} name="person" />}
        />
    );
};

export default Conversation;
