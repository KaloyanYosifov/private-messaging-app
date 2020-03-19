/**
 * External dependencies.
 */
import uuid from 'uuid-random';
import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';
import Recorder from '@/utils/recorder/Recorder';

interface ActionProps {
    themedStyle: {
        icon: {
            color: string
        }
    },
    onSend: (data: any) => void;
}

const Actions = ({ themedStyle, onSend }: ActionProps): React.FunctionComponent => {
    useEffect(() => {
        const onFinish = (path: string) => {
            onSend({ audio_url: path });
        };

        Recorder.addOnFinishedCallback(onFinish);

        return () => {
            Recorder.removeOnFinishedCallback(onFinish);
        };
    }, []);

    const onPress = useCallback(async () => {
        if (Recorder.isRecording()) {
            await Recorder.stop();

            return;
        }

        await Recorder.record(uuid());
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
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
