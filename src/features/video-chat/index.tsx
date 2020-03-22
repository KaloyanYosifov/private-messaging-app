/**
 * External dependencies.
 */

import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { MediaStream, mediaDevices, RTCView } from 'react-native-webrtc';

/**
 * Internal dependencies.
 */
import styles from './styles';

const VideoChat = (): React.FunctionComponent => {
    const [streamUrl, setStreamUrl] = useState('');

    useEffect(() => {
        const isFront = false;

        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront ? 'front' : 'environment')) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }

            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: 500, // Provide your own width, height and frame rate here
                        minHeight: 300,
                        minFrameRate: 30,
                    },
                    facingMode: (isFront ? 'user' : 'environment'),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : []),
                },
            })
                .then(stream => {
                    console.log(stream, stream.toURL());
                    if (stream instanceof MediaStream) {
                        console.log('sdf');
                        setStreamUrl(stream.toURL());
                    }
                })
                .catch(error => {
                    // Log error
                });
        });
    }, []);

    const renderVideo = () => {
        if (!streamUrl) {
            return null;
        }

        return <RTCView style={styles.view} streamURL={streamUrl} />;
    };

    return (
        <Layout style={styles.container}>
            <Text>
                Telele
            </Text>
            {renderVideo()}
        </Layout>
    );
};

export default VideoChat;
