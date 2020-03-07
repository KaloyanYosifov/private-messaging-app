/**
 * External dependencies.
 */
import React, { ReactFragment } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Layout, List } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

import { getConversations } from '@/store/conversations/getters';
import { ConversationData } from '@/interfaces/conversations/ConversationData';
import Conversation from '@/features/conversations/components/conversation';

interface ConversationListProps {
    getConversations: ConversationData[]
}

const ConversationsList = ({ getConversations }: ConversationListProps): ReactFragment => {
    return (
        <Layout style={styles.container}>
            <SafeAreaView style={styles.conversationsContainer}>
                <Layout>
                    <List data={getConversations} renderItem={({ item }) => <Conversation conversation={item} />} />
                </Layout>
            </SafeAreaView>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    getConversations: getConversations(state),
});

export default connect(mapStateToProps)(ConversationsList);
