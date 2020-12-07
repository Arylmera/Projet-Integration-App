import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchView from '../View/search/SearchView';
import DetailOiseaux from '../View/details/detailOiseaux';

const Stack = createStackNavigator();

/**
 * fonction de gestion du navigateur search
 * @return {JSX.Element}
 * @constructor
 */
function SearchNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="SearchView"
         screenOptions={{
            headerShown: false,
            headerStyle: {},
         }}>
         <Stack.Screen
            name="SearchView"
            component={SearchView}
            options={{
               title: 'Recherche',
            }}
         />
         <Stack.Screen
            name="DetailOiseaux"
            component={DetailOiseaux}
            options={{
               title: 'Detail',
            }}
         />
      </Stack.Navigator>
   );
}

export default SearchNavigator;
