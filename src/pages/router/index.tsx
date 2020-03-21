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
const ConversationStack = createStackNavigator();

const MainRouter = () => (
    <ConversationStack.Navigator headerMode="none" mode="modal">
        <ConversationStack.Screen name="Conversation" component={Conversation} />
    </ConversationStack.Navigator>
);

const Router = () => {
    return (
        <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="Dashboard" component={Dashboard} />
            <RootStack.Screen name="ConversationPage" component={MainRouter} />
            <RootStack.Screen name="Conversations" component={Conversations} />
        </RootStack.Navigator>
    );
};

export default Router;
