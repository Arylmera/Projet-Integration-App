import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from "../View/LoadingScreen";
import connexionProfilView from "../View/profile/connexionProfilView";
import ResetPasswordProfilView from "../View/profile/ResetPasswordProfilView";
import InscriptionProfilView from "../View/profile/InscriptionProfilView";

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
            <Stack.Screen
                name="connexion"
                component={connexionProfilView}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ResetPasswordProfil"
                component={ResetPasswordProfilView}
                options={{
                    title: 'Reset Password',
                }}
            />
            <Stack.Screen
                name="InscriptionProfil"
                component={InscriptionProfilView}
                options={{
                    title: 'Inscription Utilisateur',
                }}
            />
        </Stack.Navigator>
    );
}

export default LoadingNavigator;
