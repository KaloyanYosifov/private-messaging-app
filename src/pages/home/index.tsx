/**
 * External dependencies.
 */
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';
import TopNavigation from '@/features/home/components/top-navigation';

const Home = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <TopNavigation />
            <Text>Homepage</Text>
        </Layout>
    );
};

export default Home;
