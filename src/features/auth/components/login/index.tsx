/**
 * External dependencies.
 */
import React, { useState } from 'react';
import {
    Text,
    Input,
    Layout,
} from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';

const Login = (): React.ReactFragment => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Layout style={styles.container}>
            <Layout style={styles.formContainer}>
                <Text category="h1" style={styles.heading}>Log In</Text>

                <Layout style={styles.formBody}>
                    <Input
                        placeholder="Enter email"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        style={styles.formInput}
                        value={email}
                        onChange={setEmail}
                    />

                    <Input
                        placeholder="Enter password"
                        autoCompleteType="password"
                        textContentType="password"
                        secureTextEntry={true}
                        value={password}
                        onChange={setPassword}
                    />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Login;
