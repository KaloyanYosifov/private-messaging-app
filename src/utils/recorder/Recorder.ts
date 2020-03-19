/**
 * External dependencies.
 */
import { Platform } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Observable from '@/utils/Observable';
import ImmutableObservable from '@/utils/ImmutableObservable';

export enum RecorderState {
    IDLE,
    RECORDING
}

class Recorder {
    protected state: RecorderState = RecorderState.IDLE;
    protected finishedCallbacks: Array<(path: string) => void> = [];
    protected recorderStateObserver: Observable<RecorderState> = new Observable<RecorderState>();

    async record(name: string) {
        const path = `${AudioUtils.DocumentDirectoryPath}/${name}.${this.extension}`;

        if (this.recording) {
            await this.stop();
        }

        try {
            await AudioRecorder.requestAuthorization();

            await AudioRecorder.prepareRecordingAtPath(path, {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: 'Low',
                AudioEncoding: 'aac',
            });

            if (Platform.OS === 'ios') {
                AudioRecorder.onFinished = data => {
                    this.finished(data.audioFileURL);
                };
            }

            await AudioRecorder.startRecording();

            this.changeState(RecorderState.RECORDING);
        } catch (error) {
            throw error;
        }
    }

    async stop() {
        this.changeState(RecorderState.IDLE);

        const path = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
            this.finished(path);
        }
    }

    addOnFinishedCallback(callback: (path: string) => void) {
        this.finishedCallbacks.push(callback);
    }

    removeOnFinishedCallback(callback: (path: string) => void) {
        this.finishedCallbacks = this.finishedCallbacks.filter(finishedCallback => finishedCallback !== callback);
    }

    get recording() {
        return this.state === RecorderState.RECORDING;
    }

    get onRecorderStateObserver() {
        return new ImmutableObservable<RecorderState>(this.recorderStateObserver);
    }

    get extension() {
        return 'aac';
    }

    get formatType() {
        return 'audio/aac';
    }

    protected changeState(state: RecorderState) {
        this.state = state;

        this.recorderStateObserver.trigger(this.state);
    }

    protected finished(path: string) {
        for (const callback of this.finishedCallbacks) {
            callback(path);
        }
    }
}

const recorder = new Recorder();

export default recorder;
