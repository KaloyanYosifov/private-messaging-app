/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Layout, List, Spinner, withStyles } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import { getConversations, hasMorePages } from  '@/store/conversations/getters';
import { loadMoreConversations } from '@/store/conversations/actions';
import Conversation from '@/features/conversations/components/conversation';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

interface ConversationListProps {
    hasMorePages: boolean,
    getConversations: ConversationData[],
    loadMoreConversations: () => Promise<void>,
    themedStyle: { list: object }
}

const ConversationsList = ({
    hasMorePages,
    getConversations,
    loadMoreConversations,
    themedStyle,
}: ConversationListProps): any => {
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const loadMore = useCallback(() => {
        if (loading || !hasMorePages) {
            return;
        }

        setLoading(true);

        loadMoreConversations()
            .finally(() => {
                setLoading(false);
                setFirstLoad(false);
            });
    }, [loading, hasMorePages]);

    useEffect(() => {
        loadMore();
    }, []);

    const renderList = () => {
        if (firstLoad) {
            return (
                <Layout style={styles.loadingContainer}>
                    <Spinner size="giant" />
                </Layout>
            );
        }

        return (<List
            style={themedStyle.list}
            onRefresh={loadMore}
            refreshing={loading}
            data={getConversations}
            renderItem={({ item }) => <Conversation conversation={item} />}
        />);
    };

    return (
        <Layout style={styles.container}>
            <SafeAreaView style={styles.conversationsContainer}>
                <Layout>
                    {renderList()}
                </Layout>
            </SafeAreaView>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    hasMorePages: hasMorePages(state),
    getConversations: getConversations(state),
});

const mapDispatchToProps = {
    loadMoreConversations,
};

export const ThemedConversationList = withStyles(ConversationsList, (theme) => ({
    list: {
        backgroundColor: theme['background-basic-color-1'],
    },
}));

export default connect(mapStateToProps, mapDispatchToProps)(ThemedConversationList);
