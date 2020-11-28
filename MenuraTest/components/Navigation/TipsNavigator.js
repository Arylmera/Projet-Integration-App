import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TipsView from '../View/tips/TipsView';
import TipsNiche from '../View/tips/TipsNiche';
import TipsNichePlan from '../View/tips/TipsNichePlan';
import TipsMangeoire from '../View/tips/TipsMangeoire';
import TipsSaison from '../View/tips/TipsSaison';
import TipsMangeoirePlan from '../View/tips/TipsMangeoirePlan';
import QuizView from "../View/tips/QuizView";

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
            name="TipsSaison"
            component={TipsSaison}
            options={{
               title: 'Saison',
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
         <Stack.Screen
            name="TipsMangeoirePlan"
            component={TipsMangeoirePlan}
            options={{
               title: 'Plan',
            }}
         />
         <Stack.Screen
            name="TipsQuiz"
            component={QuizView}
            options={{
               title: 'Quiz',
            }}
         />
      </Stack.Navigator>
   );
}

export default TipsNavigator;
