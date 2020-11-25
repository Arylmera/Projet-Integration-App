import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoriqueView from '../View/historique/HistoriqueView';
import DetailOiseaux from '../View/details/detailOiseaux';
import HistoriqueAdd from '../View/historique/historiqueAdd';

const Stack = createStackNavigator();

function HistoriqueNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="HistoriqueView"
         screenOptions={{
            headerShown: false,
            headerStyle: {},
         }}>
         <Stack.Screen
            name="HistoriqueView"
            component={HistoriqueView}
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
         <Stack.Screen
            name="HistoriqueAdd"
            component={HistoriqueAdd}
            options={{
               title: 'Add',
            }}
         />
      </Stack.Navigator>
   );
}

export default HistoriqueNavigator;
