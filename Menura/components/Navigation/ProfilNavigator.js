import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ProfilView from "../View/profile/ProfilView";
import ProfilModificationView from "../View/profile/ProfilModificationView";
import InscriptionProfilView from "../View/profile/InscriptionProfilView";
import ResetPasswordProfilView from "../View/profile/ResetPasswordProfilView";
import connexionProfilView from "../View/profile/connexionProfilView";

const Stack = createStackNavigator()

function ProfilNavigator({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="ConnexionProfil"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "rgba(126,211,33,1)"
                }
            }}
        >
            <Stack.Screen
                name="Profil"
                component={ProfilView}
                options={{
                    title: "Profil"
                }}

            />
            <Stack.Screen
                name="ModidifProfil"
                component={ProfilModificationView}
                options={{
                    title: "Modification du profil"
                }}
            />
            <Stack.Screen
                name="ConnexionProfil"
                component={connexionProfilView}
                options={{
                    title: "Modification du profil"
                }}
            />
            <Stack.Screen
                name="ResetPasswordProfil"
                component={ResetPasswordProfilView}
                options={{
                    title: "Modification du profil"
                }}
            />
            <Stack.Screen
                name="InscriptionProfil"
                component={InscriptionProfilView}
                options={{
                    title: "Modification du profil"
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfilNavigator
