/**
 * External dependencies.
 */
import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Internal dependencies.
 */
import PagesRouter from '@/pages/router';
import AuthRouter from '@/features/auth/router';
import { isLoggedIn } from '@/store/authentication/getters';

const Tab = createBottomTabNavigator();

const Router = ({ isLoggedIn }: { isLoggedIn: Function }): React.ReactFragment => {
    return (
        <Tab.Navigator initialRouteName={isLoggedIn ? 'PagesRouter' : 'AuthRouter'} tabBar={() => React.Fragment} headerMode={'none'}>
            <Tab.Screen name="AuthRouter" component={AuthRouter} />
            <Tab.Screen name="PagesRouter" component={PagesRouter} />
        </Tab.Navigator>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: isLoggedIn(state),
});

const navigatorRef = React.createRef();

const navigation = () => navigatorRef.current;

export { navigatorRef, navigation };
export default connect(mapStateToProps, null)(Router);
