
import React from 'react';
import {StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import HeaderNavigator from "./components/Navigation/HeaderNavigator";

export default class App extends React.Component{
    render() {
    return(
        <NavigationContainer style = {styles.main_container}>
            <HeaderNavigator/>
        </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    screen: {

    }
})
