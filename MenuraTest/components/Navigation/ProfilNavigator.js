import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilView from '../View/profile/ProfilView';

const Stack = createStackNavigator();

function ProfilNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="modificationProfil"
         screenOptions={{
            headerShown: false,
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
