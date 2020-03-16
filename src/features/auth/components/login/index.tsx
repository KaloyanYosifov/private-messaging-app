/**
 * External dependencies.
 */
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import {
    Text,
    Input,
    Layout,
    Button,
} from '@ui-kitten/components';
import { connect } from 'react-redux';

/**
 * Internal dependencies.
 */
import styles from './styles';
import HttpClient from '@/client';
import { logIn, setAuthToken, loadUserData } from '@/store/authentication/actions';
import { Controller, useForm } from 'react-hook-form';

interface LoginProps {
    navigation: any,
    logIn: Function,
    setAuthToken: Function,
    loadUserData: () => Promise<void>
}

const Login = ({ navigation, setAuthToken, logIn, loadUserData }: LoginProps): React.ReactFragment => {
    const { control, handleSubmit, errors, setError, clearError, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onButtonPress = useCallback(async ({ email, password }) => {
        clearError(['globalErrors']);

        if (loading) {
            return;
        }

        setLoading(true);

        const client = new HttpClient();

        try {
            const response = await client.login(email, password);

            setAuthToken(response.data.access_token);
            logIn();

            await loadUserData();

            reset();

            navigation.navigate('PagesRouter');
        } catch (error) {
            setError('globalErrors', 'error', 'We couldn\'t find you in our database.');
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const onChange = useCallback((events: SyntheticEvent) => events[0].nativeEvent.text, []);

    return (
        <Layout style={styles.container}>
            <Layout style={styles.formContainer}>
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    keyboardVerticalOffset={Platform.select({ ios: 80, android: 200 })}
                >
                    <Text category="h1" style={styles.heading}>Log In</Text>

                    {errors.globalErrors && <Text style={styles.errorText} status="danger">{errors.globalErrors.message}</Text>}

                    <Layout style={styles.formBody}>
                        <Controller
                            as={Input}
                            name="email"
                            control={control}
                            placeholder="Enter email"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            status={errors.email ? 'danger' : ''}
                            caption={errors.email ? errors.email.message : ''}
                            style={styles.formInput}
                            rules={{ required: 'Email is required!' }}
                            onChange={onChange}
                        />

                        <Controller
                            as={Input}
                            name="password"
                            control={control}
                            placeholder="Enter password"
                            autoCompleteType="password"
                            textContentType="password"
                            autoCapitalize="none"
                            status={errors.password ? 'danger' : ''}
                            caption={errors.password ? errors.password.message : ''}
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            rules={{ required: 'Password is required!' }}
                            onChange={onChange}
                        />

                        <Button onPress={handleSubmit(onButtonPress)}
                            style={styles.button}
                            size="medium"
                            icon={() => loading ? <ActivityIndicator color="#fff" /> : <React.Fragment />}>
                            Login
                        </Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </Layout>
                </KeyboardAvoidingView>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = ({
    logIn,
    setAuthToken,
    loadUserData,
});

export default connect(null, mapDispatchToProps)(Login);
