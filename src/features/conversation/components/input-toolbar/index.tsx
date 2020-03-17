/**
 * External dependencies.
 */
import React from 'react';
import { Layout } from '@ui-kitten/components';
import { EmitterSubscription, Keyboard, View } from 'react-native';
/**
 * Internal dependencies.
 */
import styles from './styles';
import SendButton from '@/features/conversation/components/send-button';
import TextField from '@/features/conversation/components/text-field';

interface InputToolbarProps {
    options?: { [key: string]: any }
    optionTintColor?: string
}

interface InputToolbarState {
    position: string
}

class InputToolbar extends React.Component<InputToolbarProps, InputToolbarState> {
    state = {
        position: 'absolute',
    };

    keyboardWillShowListener?: EmitterSubscription = undefined;
    keyboardWillHideListener?: EmitterSubscription = undefined;

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.keyboardWillShow,
        );
        this.keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            this.keyboardWillHide,
        );
    }

    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }

    keyboardWillShow = () => {
        if (this.state.position !== 'relative') {
            this.setState({
                position: 'relative',
            });
        }
    };

    keyboardWillHide = () => {
        if (this.state.position !== 'absolute') {
            this.setState({
                position: 'absolute',
            });
        }
    };

    renderSend() {
        return <SendButton {...this.props} />;
    }

    renderTextField() {
        return <TextField {...this.props} />;
    }

    render() {
        return (
            <Layout
                style={[styles.container, { position: this.state.position }]}
            >
                <Layout>
                    {this.renderTextField()}
                    {this.renderSend()}
                </Layout>
            </Layout>
        );
    }
}

export default InputToolbar;
