/**
 * External dependencies.
 */
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { dark as theme, mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { Provider } from 'react-redux';

/**
 * Internal dependencies.
 */
import Router, { navigatorRef } from '@/router';
import Store, { persistor } from '@/store';

const App = (): React.ReactFragment => (
    <Provider store={Store}>
        <PersistGate persistor={persistor}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={theme}>
                <NavigationContainer ref={navigatorRef}>
                    <Layout style={{ flex: 1 }}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <Router />
                        </SafeAreaView>
                    </Layout>
                </NavigationContainer>
            </ApplicationProvider>
        </PersistGate>
    </Provider>
);

export default App;
