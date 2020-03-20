/**
 * External dependencies.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Internal dependencies.
 */
import SoundPlayer, { PlayerState } from '@/utils/sound-player/SoundPlayer';

const useSoundPlayer = (audioUrl: string, duration?: number) => {
    const soundPlayerRef = useRef<SoundPlayer | null>(null);
    const [initializing, setInitializing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [audioFileDuration, setAudioFileDuration] = useState(duration || 0);
    const [timePlaying, setTimePlaying] = useState(0);
    const [playerState, setPlayerState] = useState(PlayerState.IDLE);

    const initPlayer = useCallback(() => {
        return new Promise(resolve => {
            setInitializing(true);
            setLoading(true);

            const player = new SoundPlayer(audioUrl);
            soundPlayerRef.current = player;
            const onLoad = () => {
                setAudioFileDuration(player.getDuration());
                setLoading(false);
                setInitializing(false);

                player.onLoadObservable.unsubscribe(onLoad);

                resolve();
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
        });

    }, []);

    const togglePlayer = useCallback(async () => {
        if (initializing) {
            return;
        }

        if (!soundPlayerRef.current) {
            await initPlayer();
        }

        const player = soundPlayerRef.current as SoundPlayer;

        if (player.isPlaying) {
            player.pause();

            return;
        }

        await player.play();
    }, [initializing, soundPlayerRef]);

    useEffect(() => {
        if (!duration) {
            void initPlayer();
        } else {
            setLoading(false);
        }

        return () => {
            if (soundPlayerRef.current) {
                (soundPlayerRef.current as SoundPlayer).destroy();
            }
        };
    }, []);

    return {
        duration: audioFileDuration,
        loading,
        timePlaying,
        togglePlayer,
        playerState,
    };
};

export default useSoundPlayer;
