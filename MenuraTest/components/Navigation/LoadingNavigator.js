import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from "../View/LoadingScreen";

const Stack = createStackNavigator();

function LoadingNavigator({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="LoadingScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
            }}>
            <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default LoadingNavigator;
