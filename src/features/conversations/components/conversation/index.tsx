/**
 * External dependencies.
 */
import get from 'lodash.get';
import React, { ReactFragment } from 'react';
import { Icon, ListItem } from '@ui-kitten/components';
import formatDistance from 'date-fns/formatDistance';

/**
 * Internal dependencies.
 */
import { ConversationData } from '@/interfaces/conversations/ConversationData';

interface ConversationProps {
    conversation: ConversationData,
};

const Conversation = ({ conversation }: ConversationProps): ReactFragment => {
    const user = conversation.users[0];
    let description = '';

    if (conversation.last_message) {
        const { last_message: lastMessage } = conversation;
        description = `${lastMessage.text} - ${formatDistance(new Date(lastMessage.created_at), new Date())}`;
    } else {
        description = 'New message';
    }

    return (
        <ListItem
            title={user.name}
            description={description}
            icon={(style) => <Icon {...style} name="person" />}
        />
    );
};

export default Conversation;
