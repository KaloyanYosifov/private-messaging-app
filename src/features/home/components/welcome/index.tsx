/**
 * External dependencies.
 */
import React from 'react';
import { Image } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

const Welcome = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <Image style={{ width: 300, height: 300 }} source={{ uri: 'https://kyosifov.com/images/me.jpg' }} />
            <Layout style={styles.heading}>
                <Text category="h6">
                    Welcome to the private messaging app!
                </Text>
            </Layout>
        </Layout>
    );
};

export default Welcome;
