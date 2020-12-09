import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NoDataView from '../View/stats/NoDataView';
import StatsView from '../View/stats/StatsView';

const Stack = createStackNavigator();

/**
 * fonction de gestion du navigateur de l'historique
 * @return {JSX.Element}
 * @constructor
 */
function StatsNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="StatsView"
         screenOptions={{
            headerShown: false,
            headerStyle: {},
         }}>
         <Stack.Screen
            name="StatsView"
            component={StatsView}
            options={{
               title: 'statistiques',
            }}
         />
         <Stack.Screen
            name="noData"
            component={NoDataView}
            options={{
               title: 'no data',
            }}
         />
      </Stack.Navigator>
   );
}

export default StatsNavigator;
