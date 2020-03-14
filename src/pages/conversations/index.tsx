/**
 * External dependencies.
 */
import React from 'react';
import { Icon, Layout } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from '@/pages/conversations/styles';
import TopNavigation from '@/components/top-navigation';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';

import ConversationsList from '@/features/conversations/components/conversations-list';

const menuData: MenuData[] = [
    {
        title: 'Dashboard',
        action: () => {
            navigation().navigate('Dashboard');
        },
        icon: (styles) => <Icon {...styles} name="home" />,
    },
];

const Conversations = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <TopNavigation title="People you chat with" menuData={menuData} />
            <ConversationsList />
        </Layout>
    );
};

export default Conversations;
