/**
 * External dependencies.
 */
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Icon, Layout } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from '@/pages/conversations/styles';
import TopNavigation from '@/components/top-navigation';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';

import ConversationsList from '@/features/conversations/components/conversations-list';
import { resetConversations } from '@/store/conversations/actions';

const menuData: MenuData[] = [
    {
        title: 'Dashboard',
        action: () => {
            navigation().navigate('Dashboard');
        },
        icon: (styles) => <Icon {...styles} name="home" />,
    },
];

const Conversations = ({ resetConversations }: { resetConversations: () => void }): React.ReactFragment => {
    useEffect(() => {
        return resetConversations;
    }, []);

    return (
        <Layout style={styles.container}>
            <TopNavigation title="People you chat with" menuData={menuData} />
            <ConversationsList />
        </Layout>
    );
};

const mapDispatchToProps = {
    resetConversations,
};

export default connect(null, mapDispatchToProps)(Conversations);
