/**
 * External dependencies.
 */
import React from 'react';
import { Layout, withStyles } from '@ui-kitten/components';
import { EmitterSubscription, Keyboard } from 'react-native';
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
    keyboardIsShown: boolean
}

class InputToolbar extends React.Component<InputToolbarProps, InputToolbarState> {
    state = {
        keyboardIsShown: false,
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
        if (!this.state.keyboardIsShown) {
            this.setState({
                keyboardIsShown: true,
            });
        }
    };

    keyboardWillHide = () => {
        if (this.state.keyboardIsShown) {
            this.setState({
                keyboardIsShown: false,
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
        const textFieldContainerThemedStyle = this.state.keyboardIsShown ? 'textFieldContainerKeyboardShown' : 'textFieldContainer';
        return (
            <Layout
                style={[styles.container, this.props.themedStyle.container, { position: this.state.keyboardIsShown ? 'relative' : 'absolute' }]}
            >
                <Layout style={[styles.textFieldContainer, this.props.themedStyle[textFieldContainerThemedStyle]]}>
                    {this.renderTextField()}
                    {this.renderSend()}
                </Layout>
            </Layout>
        );
    }
}

const ThemedInputToolbar = withStyles(InputToolbar, (theme) => ({
    container: {
        borderTopColor: theme['color-basic-1000'],
    },
    textFieldContainer: {
        backgroundColor: theme['background-basic-color-2'],
    },
    textFieldContainerKeyboardShown: {
        backgroundColor: theme['background-basic-color-1'],
    },
}));

export default ThemedInputToolbar;
