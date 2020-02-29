/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import AuthRouter from '@/features/auth/router';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="AuthRouter" component={AuthRouter} />
        </Stack.Navigator>
    );
}

export default Router;