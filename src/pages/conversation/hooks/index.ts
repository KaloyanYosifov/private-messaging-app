/**
 * External dependencies.
 */
import { useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import Messages from '@/client/messages';
import { parseMessages } from '@/pages/conversation/utils';

export const useChatMessages = (conversationId: number, initialMessages: IMessage[] = []) => {
    const messagesClient = new Messages();
    const [messages, setMessages] = useState<IMessage[]>(initialMessages);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMorePages, setHasMorePages] = useState<boolean>(true);

    const loadMessages = () => {
        if (loading) {
            return;
        }

        setLoading(true);

        messagesClient.paginate(currentPage + 1, conversationId)
            .then(response => {
                if (!response.data) {
                    return;
                }

                setHasMorePages(response.has_more_pages);
                setMessages(GiftedChat.append(messages, parseMessages(response.data)));
            })
            .finally(() => {
                setLoading(false);
                setCurrentPage(currentPage + 1);
            });
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return [messages, setMessages, loading, hasMorePages];
};
