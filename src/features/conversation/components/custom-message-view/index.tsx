/**
 * External dependencies.
 */
import React from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
/**
 * Internal dependencies.
 */
import styles from './styles';
import { formatTimeForAPlayer } from '@/helpers';
import { useSoundPlayer } from '@/features/conversation/hooks';
import { PlayerState } from '@/utils/sound-player/SoundPlayer';

interface CustomMessageViewProps {
    currentMessage: {
        audio_url: string
    },
    position: 'right' | 'left'
}

const textStyles = {
    left: {
        text: {
            color: '#000',
        },
    },
    right: {
        text: {
            color: '#fff',
        },
    },
};

const CustomMessageView = ({ currentMessage = { audio_url: null }, position }: CustomMessageViewProps): React.FunctionComponent => {
    if (!currentMessage.audio_url) {
        return <></>;
    }

    const {
        duration,
        playerState,
        timePlaying,
        togglePlayer: onPress,
    } = useSoundPlayer(currentMessage.audio_url);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={textStyles[position].text}>{formatTimeForAPlayer(playerState !== PlayerState.IDLE ? timePlaying : duration)}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomMessageView;
