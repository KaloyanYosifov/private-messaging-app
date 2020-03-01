/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {
    Text,
    Input,
    Layout,
    Button,
} from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';
import HttpClient from '@/client';

interface LoginProps {
    navigation: any
}

const Login = ({ navigation }: LoginProps): React.ReactFragment => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Layout style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Layout style={styles.formContainer}>
                    <Text category="h1" style={styles.heading}>Log In</Text>

                    <Layout style={styles.formBody}>
                        <Input
                            placeholder="Enter email"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            style={styles.formInput}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            placeholder="Enter password"
                            autoCompleteType="password"
                            textContentType="password"
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Button style={styles.button} size="medium">Login</Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </KeyboardAvoidingView>
        </Layout>
    );
};

export default Login;
