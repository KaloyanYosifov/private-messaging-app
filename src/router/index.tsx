/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Login from '@/features/auth/components/login';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Login} />
        </Stack.Navigator>
    );
}

export default Router;
