import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoriqueView from '../View/historique/HistoriqueView';
import DetailOiseaux from '../View/details/detailOiseaux';

const Stack = createStackNavigator();

function HistoriqueNavigator({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="HistoriqueView"
      screenOptions={{
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
    </Stack.Navigator>
  );
}

export default HistoriqueNavigator;
