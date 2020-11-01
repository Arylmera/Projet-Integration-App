import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilView from '../View/profile/ProfilView';
import InscriptionProfilView from '../View/profile/InscriptionProfilView';
import ResetPasswordProfilView from '../View/profile/ResetPasswordProfilView';

const Stack = createStackNavigator();

function ProfilNavigator({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="modificationProfil"
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
    </Stack.Navigator>
  );
}

export default ProfilNavigator;
