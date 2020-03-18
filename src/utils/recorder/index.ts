/**
 * External dependencies.
 */
import { AudioRecorder, AudioUtils } from 'react-native-audio';

/**
 * Internal dependencies.
 */
import { RecorderFinishedData } from '@/utils/recorder/interfaces/RecorderFinishedData';

class Recorder {
    recording: boolean = false;

    record(name: string): Promise<RecorderFinishedData> {
        const path = `${AudioUtils.DocumentDirectoryPath}/${name}.aac`;

        return new Promise(async (resolve, reject) => {
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

                AudioRecorder.onFinished = resolve;

                await AudioRecorder.startRecording();

                this.recording = true;
            } catch (error) {
                console.log(error);

                reject(error);
            }
        });
    }

    async stop() {
        this.recording = false;

        return await AudioRecorder.stopRecording();
    }
}

const recorder = new Recorder();

export default recorder;
