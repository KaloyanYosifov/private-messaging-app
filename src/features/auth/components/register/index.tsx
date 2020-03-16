/**
 * External dependencies.
 */
import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
/**
 * Internal dependencies.
 */
import styles from './styles';

interface RegisterProps {
    navigation: any
}

interface RegisterFormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = ({ navigation }: RegisterProps): React.ReactFragment => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, errors, setError, clearError } = useForm();

    const onSubmit = useCallback((data: RegisterFormData) => {
        clearError(['name', 'email', 'password', 'confirmPassword']);

        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', 'password_mismatch', 'Passwords do not match!');

            return;
        }

        console.log(data);
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
                            name="confirmPassword"
                            placeholder="Enter confirmation password"
                            autoCompleteType="password"
                            textContentType="password"
                            status={errors.confirmPassword ? 'danger' : ''}
                            caption={errors.confirmPassword ? errors.confirmPassword.message : ''}
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            rules={{ required: 'Confirmation password is required!' }}
                            onChange={onChange}
                            defaultValue=""
                        />

                        <Button style={styles.button} size="medium" onPress={handleSubmit(onSubmit)}>Register</Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Already have an account?</Text>
                        </TouchableOpacity>
                    </Layout>
                </KeyboardAvoidingView>
            </Layout>
        </Layout>
    );
};

export default Register;
