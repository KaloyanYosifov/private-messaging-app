/**
 * External dependencies.
 */

import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { MediaStream, mediaDevices, RTCView } from 'react-native-webrtc';

/**
 * Internal dependencies.
 */
import styles from './styles';

const VideoChat = (): React.FunctionComponent => {
    const [streamUrl, setStreamUrl] = useState('');

    useEffect(() => {
        const isFront = true;

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
                    if (stream instanceof MediaStream) {
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

        return <RTCView streamURL={streamUrl} />;
    };

    return (
        <Layout stlye={styles.container}>
            {renderVideo()}
        </Layout>
    );
};

export default VideoChat;
