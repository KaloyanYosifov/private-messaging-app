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

/**
 * Internal dependencies.
 */
import Router from '@/router';

const App = (): React.ReactFragment => (
    <NavigationContainer>
        <Router />
    </NavigationContainer>
);

export default App;
