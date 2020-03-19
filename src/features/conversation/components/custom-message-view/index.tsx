/**
 * External dependencies.
 */
import React from 'react';
import { Icon, Text } from '@ui-kitten/components';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
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
        textColor: {
            color: '#000',
        },
    },
    right: {
        textColor: {
            color: '#fff',
        },
    },
};

const CustomMessageView = ({ currentMessage = { audio_url: null }, position }: CustomMessageViewProps): React.FunctionComponent => {
    if (!currentMessage.audio_url) {
        return <></>;
    }

    const {
        loading,
        duration,
        playerState,
        timePlaying,
        togglePlayer: onPress,
    } = useSoundPlayer(currentMessage.audio_url);
    const isIdle = playerState === PlayerState.IDLE;
    const renderAudioComponent = () => {
        if (loading) {
            return <ActivityIndicator color={textStyles[position].textColor.color} />;
        }

        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onPress}
            >
                <Icon
                    name={isIdle ? 'play-circle-outline' : 'pause-circle-outline'}
                    style={styles.icon}
                    width={16}
                    height={16}
                    fill={textStyles[position].textColor.color}
                />
                <Text style={textStyles[position].textColor}>
                    {
                        formatTimeForAPlayer(isIdle ? duration : timePlaying)
                    }
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {renderAudioComponent()}
        </View>
    );
};

export default CustomMessageView;
