/**
 * External dependencies.
 */
import React from 'react';
import { View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Send } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import styles from './styles';

const SendButton = (props): React.ReactFragment => {
    return (
        <Send {...props}>
            <View style={styles.container}>
                <Icon name="paper-plane-outline" width={32} height={32} />
            </View>
        </Send>
    );
};

export default SendButton;
