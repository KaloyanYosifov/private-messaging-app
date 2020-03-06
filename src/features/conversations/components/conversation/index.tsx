/**
 * External dependencies.
 */
import React, { ReactFragment } from 'react';
import { ConversationData } from '@/interfaces/conversations/ConversationData';
import { Text } from 'react-native';

/**
 * Internal dependencies.
 */

interface ConversationProps {
    conversation: ConversationData,
};

const Conversation = ({ conversation }: ConversationProps): ReactFragment => {
    return (
        <Text>
            Hello
        </Text>
    );
};

export default Conversation;
