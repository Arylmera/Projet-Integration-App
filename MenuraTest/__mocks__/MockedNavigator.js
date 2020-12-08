import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from "react-redux";
import store from '../Store/configureStore';

const Stack = createStackNavigator();
const MockedNavigator = ({component, params = {}}) => {
    return (
        <NavigationContainer>
            <Provider store={store}>
            <Stack.Navigator>
                <Stack.Screen
                    name="LoadingScreen"
                    component={component}
                    initialParams={params}
                />
                <Stack.Screen
                    name="connexion"
                    component={component}
                    initialParams={params}
                />
            </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    );
};

export default MockedNavigator;
