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
import { AttachmentData } from '@/interfaces/messaging/AttachmentData';

interface CustomMessageViewProps {
    currentMessage: {
        attachment: AttachmentData
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

const CustomMessageView = ({ currentMessage = { attachment: null }, position }: CustomMessageViewProps): React.FunctionComponent => {
    if (!currentMessage.attachment) {
        return <></>;
    }

    const {
        loading,
        duration,
        playerState,
        timePlaying,
        togglePlayer: onPress,
    } = useSoundPlayer(currentMessage.attachment.url, currentMessage.attachment.duration_in_seconds);
    const isIdle = playerState === PlayerState.IDLE;
    const isPaused = playerState === PlayerState.PAUSED;
    const renderIcon = () => {
        if (loading) {
            return <ActivityIndicator style={[styles.icon, styles.loader]} color={textStyles[position].textColor.color} />;
        }

        return (
            <Icon
                name={isIdle || isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                style={styles.icon}
                width={16}
                height={16}
                fill={textStyles[position].textColor.color}
            />
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onPress}
            >
                {renderIcon()}
                <Text style={textStyles[position].textColor}>
                    {
                        formatTimeForAPlayer(isIdle ? duration : timePlaying)
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomMessageView;
