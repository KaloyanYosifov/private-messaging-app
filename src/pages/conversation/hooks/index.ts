/**
 * External dependencies.
 */
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import Messages from '@/client/messages';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';

export const useChatMessages = (conversationId: number, initialMessages: IMessage[] = []) => {
    const messagesClient = new Messages();
    const [messages, setMessages] = useState<IMessage[]>(initialMessages);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMorePages, setHasMorePages] = useState<boolean>(true);
    const [firstLoading, setFirstLoading] = useState<boolean>(false);

    const loadMessages = useCallback(() => {
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
                setMessages((previousMessages) => GiftedChat.append(previousMessages, convertMessagesToIMessages(response.data).reverse()));
            })
            .finally(() => {
                setLoading(false);
                setFirstLoading(true);
                setCurrentPage((previousPage) => previousPage + 1);
            });
    }, [loading, currentPage]);

    useEffect(() => {
        loadMessages();
    }, []);

    return [messages, setMessages, loading, firstLoading, loadMessages, hasMorePages];
};
