/**
 * External dependencies.
 */
import React from 'react';
import { Layout, TopNavigation as UiKittenTopNavigation } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import TopNavigationMenu from '@/features/home/components/top-navigation-menu';

const TopNavigation = (): React.ReactFragment => {
    return (
        <Layout styles={styles.container}>
            <UiKittenTopNavigation title="Dashboard" alignment="center" rightControls={<TopNavigationMenu />} />
        </Layout>
    );
};

export default TopNavigation;
