/**
 * External dependencies.
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Internal dependencies.
 */
import PagesRouter from '@/pages/router';
import AuthRouter from '@/features/auth/router';

const Tab = createBottomTabNavigator();

function Router() {
    return (
        <Tab.Navigator tabBar={() => React.Fragment} headerMode={'none'}>
            <Tab.Screen name="AuthRouter" component={AuthRouter} />
            <Tab.Screen name="PagesRouter" component={PagesRouter} />
        </Tab.Navigator>
    );
}

export default Router;
