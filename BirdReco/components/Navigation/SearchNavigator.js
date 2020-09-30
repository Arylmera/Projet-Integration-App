import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SearchView from "../View/search/SearchView";
import DetailView from "../View/details/detailView";

const Stack = createStackNavigator()

function SearchNavigator({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="SearchView"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "rgba(126,211,33,1)"
                }
            }}
        >
            <Stack.Screen
                name="SearchView"
                component={SearchView}
                options={{
                    title: "Recherche"
                }}

            />
            <Stack.Screen
                name="DetailView"
                component={DetailView}
                options={{
                    title: "Detail"
                }}
            />
        </Stack.Navigator>
    )
}

export default SearchNavigator
