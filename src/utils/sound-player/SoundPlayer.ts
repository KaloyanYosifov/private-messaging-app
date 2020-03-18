/**
 * External dependencies.
 */
import Sound from 'react-native-sound';

/**
 * Internal dependencies.
 */

class SoundPlayer {
    player: Sound | null = null;
    time: number = 0;
    intervalId: number = -1;

    play(path: string): Promise<any> {
        this.destroy();

        return new Promise((resolve, reject) => {
            this.player = new Sound(path, '', (error) => {
                if (!this.player) {
                    reject('It seems the player has been destroyed before being initialized');
                    return;
                }

                if (error) {
                    reject();
                    return;
                }

                this.player.play(success => {
                    resolve(success);
                });

                this.intervalId = setInterval(() => {
                    if (!this.player) {
                        return;
                    }

                    this.player.getCurrentTime((seconds: number) => {
                        this.time = seconds;
                    });
                }, 1000);
            });
        });
    }

    pause() {
        if (!this.player) {
            return;
        }

        this.player.pause();
    }

    resume() {
        if (!this.player) {
            return;
        }

        this.player.play();
    }

    stop() {
        if (!this.player) {
            return Promise.resolve();
        }

        const playerStoppedPromise = new Promise(resolve => {
            this.player && this.player.stop(() => {
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

    destroy() {
        if (!this.player) {
            return;
        }

        this.player.release();
        clearInterval(this.intervalId);

        this.time = 0;
        this.player = null;
        this.intervalId = -1;
    }
}

export default SoundPlayer;
