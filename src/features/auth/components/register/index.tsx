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

interface RegisterProps {
    navigation: any
}

const Register = ({ navigation }: RegisterProps): React.ReactFragment => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    return (
        <Layout style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Layout style={styles.formContainer}>
                    <Text category="h1" style={styles.heading}>Register</Text>

                    <Layout style={styles.formBody}>
                        <Input
                            placeholder="Enter name"
                            autoCompleteType="name"
                            textContentType="name"
                            style={styles.formInput}
                            value={name}
                            onChangeText={setName}
                        />

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
                            style={styles.formInput}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Input
                            placeholder="Enter confirmation password"
                            autoCompleteType="password"
                            textContentType="password"
                            secureTextEntry={true}
                            style={styles.lastFormInput}
                            value={confirmationPassword}
                            onChangeText={setConfirmationPassword}
                        />

                        <Button style={styles.button} size="medium">Register</Button>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Already have an account?</Text>
                        </TouchableOpacity>
                    </Layout>
                </Layout>
            </KeyboardAvoidingView>
        </Layout>
    );
};

export default Register;
