/**
 * External dependencies.
 */
import React, { useCallback } from 'react';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import { TouchableOpacity, View } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

Sound.setCategory('Playback');

const path = AudioUtils.DocumentDirectoryPath + '/testing.aac';

const Actions = ({ themedStyle }): React.FunctionComponent => {
    const onPress = useCallback(async () => {
        try {
            await AudioRecorder.requestAuthorization();

            AudioRecorder.prepareRecordingAtPath(path, {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: 'Low',
                AudioEncoding: 'aac',
            });

            AudioRecorder.onFinished = (d) => {
                var whoosh = new Sound(d.audioFileURL, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }

                    whoosh.play(success => {
                        console.log(success);
                    });

                });
                console.log(d);
            };

            const filePath = await AudioRecorder.startRecording();

            setTimeout(async () => {
                const res = await AudioRecorder.stopRecording();

                console.log(res, filePath);
            }, 4000);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon
                name="mic-outline"
                width={32}
                height={32}
                fill={themedStyle.icon.color}
            />
        </TouchableOpacity>
    );
};

const ThemedActions = withStyles(Actions as React.FunctionComponent, theme => ({
    icon: {
        color: theme['color-primary-300'],
    },
}));

export default ThemedActions;
