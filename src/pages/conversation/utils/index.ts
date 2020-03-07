/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';
import { IMessage } from 'react-native-gifted-chat';

export const parseMessages = (messages: MessageData[]): IMessage[] => {
    return messages.map(message => ({
        _id: message.id,
        text: message.text,
        createdAt: new Date(message.created_at),
        user: {
            _id: message.user.id,
            name: message.user.name,
        },
    }));
};
