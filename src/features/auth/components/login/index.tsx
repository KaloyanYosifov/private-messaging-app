/**
 * External dependencies.
 */
import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import {
    Layout,
    Text,
} from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Login = (): React.ReactFragment => (
    <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
            Welcome to UI Kitten 😻
        </Text>
    </Layout>
);

export default Login;
