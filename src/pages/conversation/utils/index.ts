/**
 * Internal dependencies.
 */
import { MessageData } from '@/interfaces/messaging/MessageData';
import { IMessage } from 'react-native-gifted-chat';

export const convertMessagesToIMessages = (messages: MessageData[]): IMessage[] => {
    return messages.map(message => ({
        _id: message.id,
        text: message.text,
        audio_url: message.audio_url,
        createdAt: new Date(message.created_at),
        user: {
            _id: message.user.id,
            name: message.user.name,
        },
    }));
};
