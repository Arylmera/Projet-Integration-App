import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TipsView from '../View/tips/TipsView';
import TipsNiche from '../View/tips/TipsNiche';
import TipsNichePlan from '../View/tips/TipsNichePlan';
import TipsMangeoire from "../View/tips/TipsMangeoire";

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
              name="TipsNichePlan"
              component={TipsNichePlan}
              options={{
                  title: 'Plan',
              }}
          />
          <Stack.Screen
              name="TipsMangeoire"
              component={TipsMangeoire}
              options={{
                  title: 'Mangeoire',
              }}
          />
      </Stack.Navigator>
   );
}

export default TipsNavigator;
