/**
 * External dependencies.
 */
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { dark as theme, mapping } from '@eva-design/eva';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { Provider } from 'react-redux';

/**
 * Internal dependencies.
 */
import Router from '@/router';
import Store, { persistor } from '@/store';

const App = (): React.ReactFragment => (
    <NavigationContainer>
        <Provider store={Store}>
            <PersistGate persistor={persistor}>
                <ApplicationProvider mapping={mapping} theme={theme}>
                    <Layout style={{ flex: 1 }}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <Router />
                        </SafeAreaView>
                    </Layout>
                </ApplicationProvider>
            </PersistGate>
        </Provider>
    </NavigationContainer>
);

export default App;
