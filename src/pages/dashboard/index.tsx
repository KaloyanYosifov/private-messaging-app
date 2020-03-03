/**
 * External dependencies.
 */
import React from 'react';
import { Icon, Layout } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import TopNavigation from '@/components/top-navigation';
import Index from '@/features/home/components/welcome';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';

const menuData: MenuData[] = [
    {
        title: 'Messages',
        action: () => {
            navigation().navigate('Messages');
        },
        icon: (styles) => <Icon {...styles} name="message-circle-outline" />,
    },
];

const Home = (): React.ReactFragment => {

    return (
        <Layout style={styles.container}>
            <TopNavigation title="Dashboard" menuData={menuData} />
            <Index />
        </Layout>
    );
};

export default Home;
