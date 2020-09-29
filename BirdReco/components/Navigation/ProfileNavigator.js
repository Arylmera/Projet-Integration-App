import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ProfileView from "../View/profile/ProfileView";
import ProfileModificationView from "../View/profile/ProfileModificationView";

const Stack = createStackNavigator()

function ProfileNavigator({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="Views"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "rgba(126,211,33,1)"
                }
            }}
        >
            <Stack.Screen
                name="Profile"
                component={ProfileView}
                options={{
                    title: "Profile"
                }}

            />
            <Stack.Screen
                name="ModidifProfile"
                component={ProfileModificationView}
                options={{
                    title: "Modification du profile"
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator
