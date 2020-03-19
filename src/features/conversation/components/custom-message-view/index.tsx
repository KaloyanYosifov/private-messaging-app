/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import SoundPlayer from '@/utils/sound-player/SoundPlayer';

interface CustomMessageViewProps {
    currentMessage: {
        audio_url: string
    }
}

const CustomMessageView = ({ currentMessage = { audio_url: null } }: CustomMessageViewProps): React.FunctionComponent => {
    if (!currentMessage.audio_url) {
        return <></>;
    }

    const soundPlayerRef = useRef<SoundPlayer | null>(null);
    const [duration, setDuration] = useState(0);

    const onPress = useCallback(() => {
        if (!soundPlayerRef.current) {
            return;
        }

        const player = soundPlayerRef.current as SoundPlayer;

        if (player.isPlaying) {
            player.pause();

            return;
        }

        void player.play();
    }, []);

    useEffect(() => {
        const player = new SoundPlayer(currentMessage.audio_url);
        soundPlayerRef.current = player;
        const onLoad = () => {
            setDuration(player.getDuration());

            player.unsubscribeToOnLoad(onLoad);
        };

        player.subscribeToOnLoad(onLoad);

        return () => {
            player.destroy();
        };
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{duration}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomMessageView;
