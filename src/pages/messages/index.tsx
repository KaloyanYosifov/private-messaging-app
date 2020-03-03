/**
 * External dependencies.
 */
import React from 'react';
import { Icon, Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from '@/pages/messages/styles';
import TopNavigation from '@/components/top-navigation';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';

const menuData: MenuData[] = [
    {
        title: 'Dashboard',
        action: () => {
            navigation().navigate('Dashboard');
        },
        icon: (styles) => <Icon {...styles} name="home" />,
    },
];

const Messages = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <TopNavigation title="Messages" menuData={menuData} />
            <Text>
                Messages
            </Text>
        </Layout>
    );
};

export default Messages;
