/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Dashboard from '@/pages/dashboard';
import Conversation from '@/pages/conversation';
import Conversations from '@/pages/conversations';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainRouter = () => (
    <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="Dashboard" component={Dashboard} />
        <MainStack.Screen name="Conversation" component={Conversation} />
        <MainStack.Screen name="Conversations" component={Conversations} />
    </MainStack.Navigator>
);

const Router = () => {
    return (
        <RootStack.Navigator headerMode="none" mode="modal">
            <RootStack.Screen name="MainPage" component={MainRouter} />
        </RootStack.Navigator>
    );
};

export default Router;
