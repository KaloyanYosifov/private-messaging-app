/**
 * External dependencies.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
/**
 * Internal dependencies.
 */
import { getSocket } from '@/helpers/socket';
import { Channel } from 'laravel-echo/src/channel/channel';
import { MessageData } from '@/interfaces/messaging/MessageData';

export const useMessagingSocket = (
    channelName: string, currentUserId: number, onReceivedMessages: (messages: MessageData[]) => void,
) => {
    const channel = useRef<Channel | null>(null);
    const [typing, setTyping] = useState<boolean>(true);

    const stopTyping = useCallback(debounce(() => {
        if (!channel.current) {
            return;
        }

        channel.current.whisper('typing', {
            typing: false,
        });
    }, 300), [channel.current]);

    const onTextChange = useCallback(() => {
        if (!channel.current) {
            return;
        }

        channel.current.whisper('typing', {
            typing: true,
        });

        stopTyping();
    }, [channel.current]);

    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            return;
        }

        channel.current = socket.private(channelName)
            .listenForWhisper('typing', (e) => {
                setTyping(e.typing);
            });

        return () => {
            socket.leave(channelName);
        };
    }, []);

    useEffect(() => {
        const privateChannel = channel.current;

        if (!privateChannel) {
            return;
        }

        privateChannel
            .listen('.message.created.event', ({ message }: { message: MessageData }) => {
                if (message.user.id === currentUserId) {
                    return;
                }

                onReceivedMessages([message]);
            });

        return () => {
            privateChannel.stopListening('.message.created.event');
        };
    }, [onReceivedMessages]);

    return [typing, onTextChange];
};
