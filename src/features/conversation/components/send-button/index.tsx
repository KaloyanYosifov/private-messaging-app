/**
 * External dependencies.
 */
import React from 'react';
import { View } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
import { Send } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import styles from './styles';

const SendButton = (props: any): React.FunctionComponent => {
    return (
        <Send {...props}>
            <View style={styles.container}>
                <Icon
                    name="paper-plane-outline"
                    width={32}
                    height={32}
                    fill={props.themedStyle.icon.color}
                />
            </View>
        </Send>
    );
};

const ThemedSendButton = withStyles(SendButton as React.FunctionComponent, theme => ({
    icon: {
        color: theme['color-primary-300'],
    },
}));

export default ThemedSendButton;
