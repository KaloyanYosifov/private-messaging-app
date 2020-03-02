/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);

    const onButtonPress = () => {
        setSubmitted(true);
        setHasErrors(false);

        if (!email || !password) {
            return;
        }

        setLoading(true);

        const client = new HttpClient();

        client.login(email, password)
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                setHasErrors(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Layout style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Layout style={styles.formContainer}>
                    <Text category="h1" style={styles.heading}>Log In</Text>

                    {hasErrors && <Text style={styles.errorText} status="danger">We couldn't find you in our database.</Text>}

                    <Layout style={styles.formBody}>
                        <Input
                            placeholder="Enter email"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            status={submitted && !email ? 'danger' : ''}
                            caption={submitted && !email ? 'Email is required' : ''}
                            style={styles.formInput}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            placeholder="Enter password"
                            autoCompleteType="password"
                            textContentType="password"
                            autoCapitalize="none"
                            status={submitted && !password ? 'danger' : ''}
                            caption={submitted && !password ? 'Password is required' : ''}
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Button onPress={onButtonPress}
                            style={styles.button}
                            size="medium"
                            icon={() => loading ? <ActivityIndicator color="#fff" /> : <React.Fragment />}>
                            Login
                        </Button>

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
