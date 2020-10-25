import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ProfilView from "../View/profile/ProfilView";
import ProfilModificationView from "../View/profile/ProfilModificationView";
import inscriptionProfilView from "../View/profile/inscriptionProfilView";
import resetPasswordProfilView from "../View/profile/resetPasswordProfilView";
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
                name="resetPasswordProfil"
                component={resetPasswordProfilView}
                options={{
                    title: "Modification du profil"
                }}
            />
            <Stack.Screen
                name="inscriptionProfil"
                component={inscriptionProfilView}
                options={{
                    title: "Modification du profil"
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfilNavigator
