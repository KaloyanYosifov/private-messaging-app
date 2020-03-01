/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Login from '@/features/auth/components/login';
import Register from '@/features/auth/components/register';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

export default Router;
