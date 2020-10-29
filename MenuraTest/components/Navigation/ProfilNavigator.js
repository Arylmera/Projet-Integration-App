import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilView from '../View/profile/ProfilView';
import InscriptionProfilView from '../View/profile/InscriptionProfilView';
import ResetPasswordProfilView from '../View/profile/ResetPasswordProfilView';
import connexionProfilView from '../View/profile/connexionProfilView';

const Stack = createStackNavigator();

function ProfilNavigator({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="ConnexionProfil"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(126,211,33,1)',
        },
      }}>
      <Stack.Screen
        name="modificationProfil"
        component={ProfilView}
        options={{
          title: 'Profil',
        }}
      />
      <Stack.Screen
        name="ConnexionProfil"
        component={connexionProfilView}
        options={{
          title: 'Connexion du profil',
            headerLeft: () => {
                return null;
            }
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

export default ProfilNavigator;
