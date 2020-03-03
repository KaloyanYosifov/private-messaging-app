/**
 * External dependencies.
 */
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Home = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <Text>Homepage</Text>
        </Layout>
    );
};

export default Home;
