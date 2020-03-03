/**
 * External dependencies.
 */
import React from 'react';
import { Layout, TopNavigation as UiKittenTopNavigation } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import TopNavigationMenu from '@/components/top-navigation-menu';
import { MenuData } from '@/interfaces/MenuData';

interface TopNavigationProp {
    menuData: MenuData[]
}

const TopNavigation = ({ menuData }: TopNavigationProp): React.ReactFragment => {
    return (
        <Layout styles={styles.container}>
            <UiKittenTopNavigation title="Dashboard" alignment="center" rightControls={<TopNavigationMenu menuData={menuData} />} />
        </Layout>
    );
};

export default TopNavigation;
