/**
 * External dependencies.
 */
import React from 'react';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { TouchableOpacity, View } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Actions = ({ themedStyle }): React.FunctionComponent => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon
                name="mic-outline"
                width={32}
                height={32}
                fill={themedStyle.icon.color}
            />
        </TouchableOpacity>
    );
};

const ThemedActions = withStyles(Actions as React.FunctionComponent, theme => ({
    icon: {
        color: theme['color-primary-300'],
    },
}));

export default ThemedActions;
