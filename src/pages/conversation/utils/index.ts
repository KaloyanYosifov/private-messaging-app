/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';
import { EnhancedIMessage } from '@/interfaces/messaging/EnhancedIMessage';

export const convertMessagesToIMessages = (messages: MessageData[]): EnhancedIMessage[] => {
    return messages.map(message => ({
        _id: message.id,
        text: message.text,
        attachment: message.attachment,
        createdAt: new Date(message.created_at),
        user: {
            _id: message.user.id,
            name: message.user.name,
        },
    }));
};

export const convertMessageToIMessage = (message: MessageData): EnhancedIMessage => ({
    _id: message.id,
    text: message.text,
    attachment: message.attachment,
    createdAt: new Date(message.created_at),
    user: {
        _id: message.user.id,
        name: message.user.name,
    },
});
