
import React from 'react';
import { YellowBox } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HeaderNavigator from "./components/Navigation/HeaderNavigator";
import {getCurrentTheme, getStyleSheet} from "./components/StyleSheet";

class App extends React.Component{

    constructor(props){
        //YellowBox.ignoreWarnings([""]);
        super(props);
        this.refreshAppHelper = this.refreshAppHelper.bind(this);
        this.state= {
            seasonStyle : getStyleSheet(),
            currentTheme : getCurrentTheme()
        }
    }

    refreshAppHelper(){
        this.setState({
            currentTheme : getCurrentTheme()
        })
        console.log("refresh count : " + this.state.refresh)
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
    }
})

export default App
