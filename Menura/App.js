
import React from 'react';
import { YellowBox } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HeaderNavigator from "./components/Navigation/HeaderNavigator";
import { getStyleSheet } from "./components/StyleSheet";

export default class App extends React.Component{

    constructor(props){
        YellowBox.ignoreWarnings([""]);
        super(props);
        this.state= {
            seasonStyle : getStyleSheet()
        }
    }

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
