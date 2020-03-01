/**
 * External dependencies.
 */
import React from 'react';
import {
    Layout,
    Text,
} from '@ui-kitten/components';
import { connect } from 'react-redux';

/**
 * Internal dependencies.
 */
import styles from './styles';

import { ApplicationState } from '@/store';
import { isLoggedIn } from '@/store/authentication/getters';

const Login = ({ isLoggedIn }): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <Text style={styles.text} category="h1">
                Welcome to UI Kitten 😻
            </Text>

            {
                isLoggedIn ? <Text>Logged In</Text> : <Text>Not logged in lol</Text>
            }
        </Layout>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    isLoggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(Login);
