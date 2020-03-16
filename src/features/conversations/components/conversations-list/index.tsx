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

import { getConversations, hasMorePages } from '@/store/conversations/getters';
import { loadMoreConversations, restartConversations } from '@/store/conversations/actions';
import Conversation from '@/features/conversations/components/conversation';
import { ConversationData } from '@/interfaces/conversations/ConversationData';

interface ConversationListProps {
    hasMorePages: boolean,
    getConversations: ConversationData[],
    loadMoreConversations: () => Promise<void>,
    restartConversations: () => Promise<void>,
    themedStyle: { list: object }
}

const ConversationsList = ({
    hasMorePages,
    getConversations,
    loadMoreConversations,
    restartConversations,
    themedStyle,
}: ConversationListProps): any => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

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

    const onRefresh = useCallback(() => {
        if (refreshing) {
            return;
        }

        setRefreshing(true);

        restartConversations()
            .finally(() => setRefreshing(false));
    }, [refreshing]);

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
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
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
    restartConversations,
    loadMoreConversations,
};

export const ThemedConversationList = withStyles(ConversationsList, (theme) => ({
    list: {
        backgroundColor: theme['background-basic-color-1'],
    },
}));

export default connect(mapStateToProps, mapDispatchToProps)(ThemedConversationList);
