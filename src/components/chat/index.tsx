/**
 * External dependencies.
 */
import React from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */

interface ChatProps {
    onSend?: (messages: IMessage[], scrollToBottom: (animated: boolean) => void) => void
}

class Chat extends GiftedChat {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        const { messages, text, inverted } = this.props;

        if (this.props !== prevProps) {
            this.setMessages(messages || []);
        }

        if (
            inverted === false &&
            messages &&
            prevProps.messages &&
            messages.length !== prevProps.messages.length &&
            this.props.scrollToBottom
        ) {
            setTimeout(() => this.scrollToBottom(false), 200);
        }

        if (text !== prevProps.text) {
            this.setTextFromProp(text);
        }
    }

    onSend = (messages: any = [], shouldResetInputToolbar = false) => {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        const newMessages: IMessage[] = messages.map(message => {
            return {
                ...message,
                user: this.props.user!,
                createdAt: new Date(),
                _id: this.props.messageIdGenerator && this.props.messageIdGenerator(),
            };
        });

        if (shouldResetInputToolbar) {
            this.setIsTypingDisabled(true);
            this.resetInputToolbar();
        }
        if ((this.props as ChatProps).onSend) {
            (this.props as ChatProps).onSend(newMessages, this.scrollToBottom.bind(this));
        }

        if (shouldResetInputToolbar) {
            setTimeout(() => {
                if (this.getIsMounted()) {
                    this.setIsTypingDisabled(false);
                }
            }, 100);
        }
    };
}

export default Chat;
