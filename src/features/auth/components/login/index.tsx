/**
 * External dependencies.
 */
import React from 'react';
import {
    ImageProps,
    ImageStyle,
} from 'react-native';
import {
    ApplicationProvider,
    Button,
    Icon,
    IconRegistry,
    Layout,
    Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
    mapping,
    dark as theme,
} from '@eva-design/eva';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Login = (): React.ReactFragment => (
    <>
        <Layout style={styles.container}>
            <Text style={styles.text} category="h1">
                Welcome to UI Kitten 😻
            </Text>
            <Text style={styles.text} category="s1">
                Start with editing App.js to configure your App
            </Text>
            <Text style={styles.text} appearance="hint">
                For example, try changing theme to Dark by simply changing an import
            </Text>
        </Layout>
    </>
);

export default Login;
