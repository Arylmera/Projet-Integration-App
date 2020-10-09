import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation, CommonActions} from "@react-navigation/native";
import ViewNavigator from "./ViewNavigator";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import ProfileNavigator from "./ProfileNavigator";
import {getCurrentTheme, getStyleSheet, getThemeHigLight, getThemePrimary, getThemeSecondary} from "../StyleSheet";

const Stack = createStackNavigator()

class HeaderNavigator extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            seasonStyle : getStyleSheet(),
            currentTheme : getCurrentTheme(),
            title : ""
        }
    }

    render(){
        return (
            <Stack.Navigator
                initialRouteName="Views"
                screenOptions={{
                    headerTintColor : getThemePrimary(),
                    headerStyle: {
                        backgroundColor: getThemeHigLight(),
                    }
                }}
            >
                <Stack.Screen
                    name="Views"
                    component={ViewNavigator}
                    options={{
                        title : this.state.title,
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

let styles = StyleSheet.create({
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
