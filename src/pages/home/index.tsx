/**
 * External dependencies.
 */
import React from 'react';
import { Divider, Layout } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import TopNavigation from '@/features/home/components/top-navigation';
import Index from '@/features/home/components/welcome';

const Home = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <TopNavigation />
            <Divider />
            <Index />
        </Layout>
    );
};

export default Home;
