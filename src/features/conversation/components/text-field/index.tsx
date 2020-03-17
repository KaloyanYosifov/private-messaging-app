/**
 * External dependencies.
 */
import React from 'react';
import { withStyles } from '@ui-kitten/components';
import { TextInput, TextInputProps } from 'react-native';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { MIN_COMPOSER_HEIGHT } from '@/features/conversation/constants';

interface ComposerProps {
    composerHeight?: number
    text?: string
    placeholder?: string
    textInputProps?: Partial<TextInputProps>
    textInputStyle?: TextInputProps['style']
    textInputAutoFocus?: boolean
    keyboardAppearance?: TextInputProps['keyboardAppearance']
    multiline?: boolean
    disableComposer?: boolean

    onTextChanged?(text: string): void

    onInputSizeChanged?(contentSize: { width: number; height: number }): void
}

class TextField extends React.Component<ComposerProps, any> {
    static defaultProps = {
        composerHeight: MIN_COMPOSER_HEIGHT,
        text: '',
        placeholder: '',
        textInputProps: null,
        multiline: true,
        disableComposer: false,
        textInputStyle: {},
        textInputAutoFocus: false,
        keyboardAppearance: 'default',
        onTextChanged: () => {},
        onInputSizeChanged: () => {},
    };

    contentSize?: { width: number; height: number } = undefined;

    onContentSizeChange = (e: any) => {
        const { contentSize } = e.nativeEvent;

        // Support earlier versions of React Native on Android.
        if (!contentSize) {
            return;
        }

        if (
            !this.contentSize ||
            (this.contentSize &&
                (this.contentSize.width !== contentSize.width ||
                    this.contentSize.height !== contentSize.height))
        ) {
            this.contentSize = contentSize;
            this.props.onInputSizeChanged!(this.contentSize!);
        }
    };

    onChangeText = (text: string) => {
        this.props.onTextChanged!(text);
    };

    render() {
        return (
            <TextInput
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                multiline={this.props.multiline}
                editable={!(this.props.disableComposer)}
                placeholderTextColor={this.props.themedStyle.placeholder.color}
                onChange={this.onContentSizeChange}
                onContentSizeChange={this.onContentSizeChange}
                onChangeText={this.onChangeText}
                style={[
                    styles.textInput,
                    this.props.themedStyle.textInput,
                    this.props.textInputStyle,
                    {
                        height: this.props.composerHeight,
                    },
                ]}
                autoFocus={this.props.textInputAutoFocus}
                value={this.props.text}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
                keyboardAppearance={this.props.keyboardAppearance}
                {...this.props.textInputProps}
            />
        );
    }
}

const ThemedTextField = withStyles(TextField as React.ComponentType<ComposerProps>, theme => ({
    textInput: {
        color: theme['color-primary-100'],
    },
    placeholder: {
        color: theme['color-primary-200'],
    },
}));

export default ThemedTextField;
