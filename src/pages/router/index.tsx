/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Home from '@/pages/home';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

export default Router;
