/**
 * External dependencies.
 */
import Sound from 'react-native-sound';

class SoundPlayer {
    protected player: Sound | null = null;
    protected time: number = 0;
    protected intervalId: number = -1;
    protected onLoadSubscription: Array<() => void> = [];
    protected onEndSubscriptions: Array<(success: boolean) => void> = [];
    protected timeChangeSubscriptions: Array<(seconds: number) => void> = [];
    protected playing: boolean = false;
    protected duration: number = 0;

    constructor(path: string) {
        this.player = new Sound(path, '', (error) => {
            if (error || !this.player) {
                this.player = null;
                return;
            }

            this.duration = this.player.getDuration();

            for (const onLoadCallback of this.onLoadSubscription) {
                onLoadCallback();
            }
        });
    }

    async play() {
        if (!this.player) {
            return Promise.reject();
        }

        if (this.playing) {
            await this.stop();
        }

        this.player.play((success) => {
            for (const onEndCallback of this.onEndSubscriptions) {
                onEndCallback(success);
            }
        });

        this.startTimeChange();

        this.playing = true;
    }

    pause() {
        if (!this.player) {
            return;
        }

        this.player.pause();

        this.playing = false;
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
                this.playing = false;
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

    subscribeToTimeChange(callback: (seconds: number) => void) {
        this.timeChangeSubscriptions.push(callback);
    }

    subscribeToOnEnd(callback: (success: boolean) => void) {
        this.onEndSubscriptions.push(callback);
    }

    subscribeToOnLoad(callback: () => void) {
        this.onLoadSubscription.push(callback);
    }

    unsubscribeToTimeChange(callback: (seconds: number) => void) {
        this.timeChangeSubscriptions = this.timeChangeSubscriptions.filter(subscription => subscription !== callback);
    }

    unsubscribeToOnEnd(callback: (success: boolean) => void) {
        this.onEndSubscriptions = this.onEndSubscriptions.filter(subscription => subscription !== callback);
    }

    unsubscribeToOnLoad(callback: () => void) {
        this.onLoadSubscription = this.onLoadSubscription.filter(subscription => subscription !== callback);
    }

    getDuration() {
        return Math.ceil(this.duration);
    }

    get isPlaying() {
        return this.playing;
    }

    destroy() {
        if (!this.player) {
            return;
        }

        this.player.release();
        this.stopTimeChange();

        this.time = 0;
        this.player = null;
        this.onEndSubscriptions = [];
        this.timeChangeSubscriptions = [];
    }

    protected triggerTimeChange(seconds: number) {
        for (const timeChangeCallback of this.timeChangeSubscriptions) {
            timeChangeCallback(seconds);
        }
    }

    protected startTimeChange() {
        this.stopTimeChange();

        if (!this.player) {
            return;
        }

        this.intervalId = setInterval(() => {
            if (!this.player) {
                return;
            }

            this.player.getCurrentTime((seconds) => {
                this.triggerTimeChange(seconds);
            });
        });
    }

    protected stopTimeChange() {
        clearInterval(this.intervalId);

        this.intervalId = -1;
    }
}

export default SoundPlayer;
