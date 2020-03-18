/**
 * External dependencies.
 */
import { Platform } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

class Recorder {
    protected recording: boolean = false;
    protected finishedCallbacks: Array<(path: string) => void> = [];

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

            this.recording = true;
        } catch (error) {
            throw error;
        }
    }

    async stop() {
        this.recording = false;

        const path = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
            this.finished(path);
        }
    }

    isRecording() {
        return this.recording;
    }

    addOnFinishedCallback(callback: (path: string) => void) {
        this.finishedCallbacks.push(callback);
    }

    removeOnFinishedCallback(callback: (path: string) => void) {
        this.finishedCallbacks = this.finishedCallbacks.filter(finishedCallback => finishedCallback !== callback);
    }

    get extension() {
        return 'aac';
    }

    get formatType() {
        return 'audio/acc';
    }

    protected finished(path: string) {
        for (const callback of this.finishedCallbacks) {
            callback(path);
        }
    }
}

const recorder = new Recorder();

export default recorder;
