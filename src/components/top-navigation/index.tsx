/**
 * External dependencies.
 */
import React from 'react';
import { Divider, Layout, TopNavigation as UiKittenTopNavigation } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import TopNavigationMenu from '@/components/top-navigation-menu';
import { MenuData } from '@/interfaces/MenuData';

interface TopNavigationProp {
    menuData: MenuData[],
    title?: string;
}

const TopNavigation = ({ menuData, title }: TopNavigationProp): React.ReactFragment => {
    return (
        <>
            <Layout styles={styles.container}>
                <UiKittenTopNavigation title={title} alignment="center" rightControls={<TopNavigationMenu menuData={menuData} />} />
            </Layout>
            <Divider />
        </>
    );
};

export default TopNavigation;
