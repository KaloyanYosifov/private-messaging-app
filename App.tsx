/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

/**
 * External dependencies.
 */
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { dark as theme, mapping } from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import Router from '@/router';
import { SafeAreaView } from 'react-native';

const App = (): React.ReactFragment => (
    <NavigationContainer>
        <ApplicationProvider mapping={mapping} theme={theme}>
            <Layout style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Router />
                </SafeAreaView>
            </Layout>
        </ApplicationProvider>
    </NavigationContainer>
);

export default App;
