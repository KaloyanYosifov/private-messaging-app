/**
 * External dependencies.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Internal dependencies.
 */
import SoundPlayer, { PlayerState } from '@/utils/sound-player/SoundPlayer';

export const useSoundPlayer = (audioUrl: string) => {
    const soundPlayerRef = useRef<SoundPlayer | null>(null);
    const [duration, setDuration] = useState(0);
    const [timePlaying, setTimePlaying] = useState(0);
    const [playerState, setPlayerState] = useState(PlayerState.IDLE);

    const togglePlayer = useCallback(() => {
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
        const player = new SoundPlayer(audioUrl);
        soundPlayerRef.current = player;
        const onLoad = () => {
            setDuration(player.getDuration());

            player.onLoadObservable.unsubscribe(onLoad);
        };
        const onTimeChange = (seconds: number) => {
            setTimePlaying(seconds);
        };
        const onPlayerStateChange = (state: PlayerState) => {
            setPlayerState(state);
        };

        player.onLoadObservable.subscribe(onLoad);
        player.onTimeChangeObservable.subscribe(onTimeChange);
        player.onPlayerStateChangeObservable.subscribe(onPlayerStateChange);

        return () => {
            player.destroy();
        };
    }, []);

    return {
        duration,
        timePlaying,
        togglePlayer,
        playerState,
    };
};
