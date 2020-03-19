/**
 * External dependencies.
 */
import { useCallback, useEffect, useState } from 'react';

/**
 * Internal dependencies.
 */
import Recorder, { RecorderState } from '@/utils/recorder/Recorder';
import uuid from 'uuid-random';

const useRecorder = (onFinish: (path: string) => void) => {
    const [recorderState, setRecorderState] = useState(RecorderState.IDLE);

    useEffect(() => {
        const onRecorderStateChange = (state: RecorderState) => {
            setRecorderState(state);
        };

        Recorder.addOnFinishedCallback(onFinish);
        Recorder.onRecorderStateObserver.subscribe(onRecorderStateChange);

        return () => {
            Recorder.removeOnFinishedCallback(onFinish);
            Recorder.onRecorderStateObserver.unsubscribe(onRecorderStateChange);
        };
    }, [onFinish]);

    const toggleRecorder = useCallback(async () => {
        if (Recorder.recording) {
            await Recorder.stop();

            return;
        }

        await Recorder.record(uuid());
    }, []);

    return {
        recorderState,
        toggleRecorder,
    };
};

export default useRecorder;
