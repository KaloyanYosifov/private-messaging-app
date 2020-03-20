/**
 * External dependencies.
 */
import Sound from 'react-native-sound';
import Observable from '@/utils/Observable';
import ImmutableObservable from '@/utils/ImmutableObservable';

export enum PlayerState {
    PLAYING,
    PAUSED,
    IDLE
}

class SoundPlayer {
    protected player: Sound | null = null;
    protected time: number = 0;
    protected intervalId: number = -1;
    protected loadObservable: Observable<never> = new Observable<never>();
    protected endObservable: Observable<boolean> = new Observable<boolean>();
    protected timeChangeObservable: Observable<number> = new Observable<number>();
    protected playerStateChangeObservable: Observable<PlayerState> = new Observable<number>();
    protected playerState: PlayerState = PlayerState.IDLE;
    protected duration: number = 0;

    constructor(path: string) {
        this.player = new Sound(path, '', (error) => {
            if (error || !this.player) {
                this.player = null;
                return;
            }

            this.duration = this.player.getDuration();

            this.loadObservable.trigger();

            this.triggerTimeChange(this.time);
        });
    }

    async play() {
        if (!this.player) {
            return Promise.reject();
        }

        if (this.isPlaying) {
            await this.stop();
        }

        this.player.play((success) => {
            this.endObservable.trigger(success);

            this.stop();
        });

        this.startTimeTracking();

        this.changeState(PlayerState.PLAYING);
    }

    pause() {
        if (!this.player) {
            return;
        }

        this.player.pause();

        // update the current time when we pause
        this.player.getCurrentTime((seconds) => {
            this.time = Math.ceil(seconds);

            this.triggerTimeChange(this.time);
        });

        this.stopTimeTracking();

        this.changeState(PlayerState.PAUSED);
    }

    resume() {
        if (!this.player) {
            return;
        }

        this.player.play();
    }

    stop() {
        if (!this.player) {
            return Promise.reject();
        }

        const playerStoppedPromise = new Promise(resolve => {
            this.player && this.player.stop(() => {
                this.stopTimeTracking();

                this.changeState(PlayerState.IDLE);
                this.time = 0;

                this.triggerTimeChange(this.time);

                resolve();
            });
        });

        const timedOutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject();
            }, 15000);
        });

        return Promise.race([
            playerStoppedPromise,
            timedOutPromise,
        ]);
    }

    get onTimeChangeObservable() {
        return new ImmutableObservable<number>(this.timeChangeObservable);
    }

    get onLoadObservable() {
        return new ImmutableObservable<never>(this.loadObservable);
    }

    get onEndObservable() {
        return new ImmutableObservable<boolean>(this.endObservable);
    }

    get onPlayerStateChangeObservable() {
        return new ImmutableObservable<PlayerState>(this.playerStateChangeObservable);
    }

    get isPlaying() {
        return this.playerState === PlayerState.PLAYING;
    }

    getDuration() {
        return Math.ceil(this.duration);
    }

    destroy() {
        if (!this.player) {
            return;
        }

        this.player.release();
        this.stopTimeTracking();

        this.time = 0;
        this.player = null;
        this.endObservable.destroy();
        this.loadObservable.destroy();
        this.timeChangeObservable.destroy();
        this.playerStateChangeObservable.destroy();
    }

    protected changeState(state: PlayerState) {
        this.playerState = state;

        this.playerStateChangeObservable.trigger(this.playerState);
    }

    protected stopTimeTracking() {
        clearInterval(this.intervalId);

        this.intervalId = -1;
    }

    protected startTimeTracking() {
        this.intervalId = setInterval(() => {
            this.time++;

            this.triggerTimeChange(this.time);
        }, 1000);
    }

    protected triggerTimeChange(seconds: number) {
        this.timeChangeObservable.trigger(seconds);
    }
}

export default SoundPlayer;
