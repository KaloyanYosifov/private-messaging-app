/**
 * External dependencies.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from '@/pages/messages/styles';
import TopNavigation from '@/components/top-navigation';
import { MenuData } from '@/interfaces/MenuData';
import { navigation } from '@/router';
import { loadMoreMessages } from '@/store/messages/actions';

const menuData: MenuData[] = [
    {
        title: 'Dashboard',
        action: () => {
            navigation().navigate('Dashboard');
        },
        icon: (styles) => <Icon {...styles} name="home" />,
    },
];

const Messages = ({ loadMoreMessages }: { loadMoreMessages: Function }): React.ReactFragment => {
    useEffect(() => {
        loadMoreMessages();

        return () => {

        };
    });

    return (
        <Layout style={styles.container}>
            <TopNavigation title="Messages" menuData={menuData} />
            <Text>
                Messages
            </Text>
        </Layout>
    );
};

const mapDispatchToProps = ({
    loadMoreMessages,
});

export default connect(null, mapDispatchToProps)(Messages);
