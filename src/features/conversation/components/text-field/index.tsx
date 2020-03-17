/**
 * External dependencies.
 */
import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { MIN_COMPOSER_HEIGHT } from '@/features/conversation/constants';

interface ComposerProps {
    text?: string
    placeholder?: string
    textInputProps?: Partial<TextInputProps>
    textInputAutoFocus?: boolean
    keyboardAppearance?: TextInputProps['keyboardAppearance']
    multiline?: boolean
    disableComposer?: boolean

    onTextChanged?(text: string): void

    onInputSizeChanged?(contentSize: { width: number; height: number }): void
}

class TextField extends React.Component<ComposerProps, any> {
    static defaultProps = {
        text: '',
        placeholder: '',
        textInputProps: null,
        multiline: true,
        disableComposer: false,
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
            <Input
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                multiline={this.props.multiline}
                editable={!(this.props.disableComposer)}
                onChange={this.onContentSizeChange}
                onContentSizeChange={this.onContentSizeChange}
                onChangeText={this.onChangeText}
                style={[
                    styles.textInput,
                    this.props.textInputStyle,
                    {
                        height: MIN_COMPOSER_HEIGHT,
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

export default TextField;
