/**
 * External dependencies.
 */
import get from 'lodash.get';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
/**
 * Internal dependencies.
 */
import styles from './styles';
import HttpClient from '@/client';
import { loadUserData, logIn, setAuthToken } from '@/store/authentication/actions';

interface RegisterProps {
    navigation: any,
    logIn: Function,
    setAuthToken: Function,
    loadUserData: () => Promise<void>
}

interface RegisterFormData {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

const Register = ({ navigation, setAuthToken, logIn, loadUserData }: RegisterProps): React.ReactFragment => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, errors, setError, clearError, reset } = useForm();

    const onSubmit = useCallback(async (
        {
            name,
            email,
            password,
            passwordConfirmation: password_confirmation,
        }: RegisterFormData) => {
        if (password !== password_confirmation) {
            setError('passwordConfirmation', 'password_mismatch', 'Passwords do not match!');

            return;
        }

        clearError(['name', 'email', 'password', 'passwordConfirmation']);

        if (loading) {
            return;
        }

        setLoading(true);

        const client = new HttpClient();

        try {
            const response = await client.register({ name, email, password, password_confirmation });

            setAuthToken(response.data.access_token);
            logIn();

            await loadUserData();

            reset();

            navigation.navigate('PagesRouter');
        } catch (error) {
            setError('globalErrors', 'error', get(error, 'response.data.message'));
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
                    <Text category="h1" style={styles.heading}>Register</Text>

                    {errors.globalErrors && <Text style={styles.errorText} status="danger">{errors.globalErrors.message}</Text>}

                    <Layout style={styles.formBody}>
                        <Controller
                            as={Input}
                            control={control}
                            name="name"
                            placeholder="Enter name"
                            autoCompleteType="name"
                            textContentType="name"
                            status={errors.name ? 'danger' : ''}
                            caption={errors.name ? errors.name.message : ''}
                            style={styles.formInput}
                            rules={{ required: 'Name is required!' }}
                            onChange={onChange}
                            defaultValue=""
                        />

                        <Controller
                            as={Input}
                            control={control}
                            name="email"
                            placeholder="Enter email"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            status={errors.email ? 'danger' : ''}
                            caption={errors.email ? errors.email.message : ''}
                            style={styles.formInput}
                            rules={{ required: 'Email is required!' }}
                            onChange={onChange}
                            defaultValue=""
                        />

                        <Controller
                            as={Input}
                            control={control}
                            name="password"
                            placeholder="Enter password"
                            autoCompleteType="password"
                            textContentType="password"
                            status={errors.password ? 'danger' : ''}
                            caption={errors.password ? errors.password.message : ''}
                            secureTextEntry={true}
                            style={styles.formInput}
                            rules={{ required: 'Password is required!' }}
                            onChange={onChange}
                            defaultValue=""
                        />

                        <Controller
                            as={Input}
                            control={control}
                            name="passwordConfirmation"
                            placeholder="Enter confirmation password"
                            autoCompleteType="password"
                            textContentType="password"
                            status={errors.passwordConfirmation ? 'danger' : ''}
                            caption={errors.passwordConfirmation ? errors.passwordConfirmation.message : ''}
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            rules={{ required: 'Confirmation password is required!' }}
                            onChange={onChange}
                            defaultValue=""
                        />

                        <Button
                            style={styles.button}
                            size="medium"
                            icon={() => loading ? <ActivityIndicator color="#fff" /> : <React.Fragment />}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Register
                        </Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Already have an account?</Text>
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

export default connect(null, mapDispatchToProps)(Register);
