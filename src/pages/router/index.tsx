/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Home from '@/pages/home';
import Messages from '@/pages/messages';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
    );
}

export default Router;
