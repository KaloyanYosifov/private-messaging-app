/**
 * External dependencies.
 */
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Conversation = ({ route }: { route: any }): React.ReactFragment => {
    const conversationId = route.params.conversationId;

    return (
        <Layout style={styles.container}>
            <Text>{conversationId}</Text>
        </Layout>
    );
};

export default Conversation;
