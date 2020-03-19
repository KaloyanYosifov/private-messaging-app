/**
 * External dependencies.
 */
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { RecorderState } from '@/utils/recorder/Recorder';
import { useRecorder } from '@/features/conversation/hooks';

interface ActionProps {
    themedStyle: {
        icon: {
            color: string
        }
    },
    onSend: (data: any) => void;
}

const Actions = ({ themedStyle, onSend }: ActionProps): React.FunctionComponent => {
    const onFinish = (path: string) => {
        onSend({ audio_url: path });
    };
    const { recorderState, toggleRecorder } = useRecorder(onFinish);
    const iconRef = React.createRef();
    const onPress = useCallback(() => {
        if (recorderState === RecorderState.RECORDING) {
            iconRef.current.stopAnimation();
        } else {
            iconRef.current.startAnimation();
        }

        void toggleRecorder();
    }, [iconRef]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon
                ref={iconRef}
                name={recorderState === RecorderState.RECORDING ? 'pause-circle-outline' : 'mic-outline'}
                width={32}
                height={32}
                fill={themedStyle.icon.color}
                animation="pulse"
                animationConfig={{ cycles: Infinity }}
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
