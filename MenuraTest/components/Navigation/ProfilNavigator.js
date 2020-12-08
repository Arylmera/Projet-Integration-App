import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilView from '../View/profile/ProfilView';
import AvatarView from '../View/profile/AvatarView';

const Stack = createStackNavigator();

/**
 * fonction de gestion du navigateur profil
 * @return {JSX.Element}
 * @constructor
 */
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
         <Stack.Screen
            name="avatar"
            component={AvatarView}
            options={{
               title: 'Avatar',
            }}
         />
      </Stack.Navigator>
   );
}

export default ProfilNavigator;
