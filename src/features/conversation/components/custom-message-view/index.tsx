/**
 * External dependencies.
 */
import React from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
/**
 * Internal dependencies.
 */
import { formatTimeForAPlayer } from '@/helpers';
import { useSoundPlayer } from '@/features/conversation/hooks';
import { PlayerState } from '@/utils/sound-player/SoundPlayer';

interface CustomMessageViewProps {
    currentMessage: {
        audio_url: string
    }
}

const CustomMessageView = ({ currentMessage = { audio_url: null } }: CustomMessageViewProps): React.FunctionComponent => {
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
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{formatTimeForAPlayer(playerState !== PlayerState.IDLE ? timePlaying : duration)}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomMessageView;
