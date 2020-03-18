/**
 * External dependencies.
 */
import { useCallback, useEffect, useReducer, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import MessagesClient from '@/client/messages-client';
import { convertMessagesToIMessages } from '@/pages/conversation/utils';
import {
    SET_PAGE,
    SET_LOADING,
    SET_MESSAGES,
    HAS_MORE_PAGES,
    SET_FIRST_LOADING,
} from './types';

interface StateModel {
    messages: IMessage[],
    loading: boolean,
    currentPage: number,
    hasMorePages: boolean,
    firstLoading: boolean
};

const initialState: StateModel = {
    messages: [],
    loading: false,
    currentPage: 0,
    hasMorePages: false,
    firstLoading: false,
};

const messagesReducer = (state: StateModel, action): any => {
    if (action.type === SET_LOADING) {
        return {
            ...state,
            loading: action.payload,
        };
    }

    if (action.type === HAS_MORE_PAGES) {
        return {
            ...state,
            hasMorePages: action.payload,
        };
    }

    if (action.type === SET_MESSAGES) {
        return {
            ...state,
            messages: [...action.payload],
        };
    }

    if (action.type === SET_FIRST_LOADING) {
        return {
            ...state,
            firstLoading: action.payload,
        };
    }

    if (action.type === SET_PAGE) {
        return {
            ...state,
            currentPage: action.payload,
        };
    }

    return state;
};

const messagesClient = new MessagesClient();

export const useChatMessages = (conversationId: number, initialMessages: IMessage[] = []) => {
    // do not get scared of the error
    // it's a bug in the type system of @types/react
    const [state, dispatch] = useReducer<any>(
        messagesReducer,
        { ...initialState, messages: [...initialMessages] },
    );

    const setMessages = useCallback((setter: (messages: IMessage[]) => IMessage[]) => {
        dispatch({
            type: SET_MESSAGES,
            payload: setter(state.messages),
        });
    }, [state]);

    const loadMessages = useCallback(() => {
        if (state.loading) {
            return;
        }

        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        messagesClient.paginate(state.currentPage + 1, conversationId)
            .then(response => {
                if (!response.data) {
                    return;
                }

                dispatch({
                    type: HAS_MORE_PAGES,
                    payload: response.has_more_pages,
                });

                setMessages((previousMessages) => GiftedChat.append(
                    previousMessages, convertMessagesToIMessages(response.data).reverse(),
                ));
            })
            .finally(() => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_FIRST_LOADING,
                    payload: true,
                });
                dispatch({
                    type: SET_PAGE,
                    payload: state.currentPage + 1,
                });
            });
    }, [state.currentPage, dispatch]);

    useEffect(() => {
        loadMessages();
    }, []);

    return [state, setMessages, loadMessages];
};
