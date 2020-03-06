/**
 * External dependencies.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from '@/pages/conversations/styles';
import TopNavigation from '@/components/top-navigation';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';
import { loadMoreConversations } from '@/store/conversations/actions';

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

const Conversations = ({ loadMoreConversations }: { loadMoreConversations: Function }): React.ReactFragment => {
    useEffect(() => {
        loadMoreConversations();
    }, []);

    return (
        <Layout style={styles.container}>
            <TopNavigation title="People you chat with" menuData={menuData} />
            <ConversationsList />
        </Layout>
    );
};

const mapDispatchToProps = ({
    loadMoreConversations,
});

export default connect(null, mapDispatchToProps)(Conversations);
