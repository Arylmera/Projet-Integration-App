import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation, CommonActions} from "@react-navigation/native";
import ViewNavigator from "./ViewNavigator";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import ProfileNavigator from "./ProfileNavigator";

const Stack = createStackNavigator()

function HeaderNavigator({navigation}) {
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
                name=" "
                component={ViewNavigator}
                options={{
                    headerRight: () => <HeaderRight/>
                }}

            />
            <Stack.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    title: "Profile"
                }}
            />
        </Stack.Navigator>
    )
}

const HeaderRight = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerIcon}>
            <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => { navigation.dispatch(CommonActions.navigate('Profile')); }}
            >
                <Image
                    source={require('../../assets/images/profileIcon.png')}
                    style={styles.profileIcon}
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    headerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        width: 40,
        height: 40
    }
})

export default HeaderNavigator
