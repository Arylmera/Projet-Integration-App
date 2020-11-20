import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TipsView from '../View/tips/TipsView';
import TipsNiche from '../View/tips/TipsNiche';
import TipsNicheItem from '../View/tips/TipsItem';

const Stack = createStackNavigator();

function TipsNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="TipsView"
         screenOptions={{
            headerShown: false,
            headerStyle: {},
         }}>
         <Stack.Screen
            name="TipsView"
            component={TipsView}
            options={{
               title: 'Tips',
            }}
         />
         <Stack.Screen
            name="TipsNiche"
            component={TipsNiche}
            options={{
               title: 'Niche',
            }}
         />
          <Stack.Screen
              name="TipsNicheItem"
              component={TipsNicheItem}
              options={{
                  title: 'Niche',
              }}
          />
      </Stack.Navigator>
   );
}

export default TipsNavigator;
