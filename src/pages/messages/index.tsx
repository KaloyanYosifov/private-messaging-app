/**
 * External dependencies.
 */
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from '@/pages/messages/styles';

const Messages = (): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <Text>
                Messages
            </Text>
        </Layout>
    );
};

export default Messages;
