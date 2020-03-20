/**
 * External dependencies.
 */
import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { RecorderState } from '@/utils/recorder/Recorder';
import { useRecorder } from '@/features/conversation/hooks';
import SoundPlayer from '@/utils/sound-player/SoundPlayer';

interface ActionProps {
    themedStyle: {
        icon: {
            color: string
        }
    },
    onSend: (data: any) => void;
}

const Actions = ({ themedStyle, onSend }: ActionProps): React.FunctionComponent => {
    const [isPreparingAudio, setIsPreparingAudio] = useState(false);
    const onFinish = useCallback((path: string) => {
        setIsPreparingAudio(true);

        const player = new SoundPlayer(path);
        const onLoad = () => {
            onSend({ attachment: { url: path, duration_in_seconds: player.getDuration() } });

            player.onLoadObservable.unsubscribe(onLoad);
            player.destroy();

            setIsPreparingAudio(false);
        };

        player.onLoadObservable.subscribe(onLoad);
    }, [onSend]);
    const { recorderState, toggleRecorder } = useRecorder(onFinish);
    const iconRef = React.createRef();
    const onPress = useCallback(() => {
        if (isPreparingAudio) {
            return;
        }

        if (recorderState === RecorderState.RECORDING) {
            iconRef.current.stopAnimation();
        } else {
            iconRef.current.startAnimation();
        }

        void toggleRecorder();
    }, [iconRef, isPreparingAudio]);

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
