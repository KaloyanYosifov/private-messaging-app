/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Dashboard from '@/pages/dashboard';
import Messages from '@/pages/messages';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
    );
}

export default Router;
