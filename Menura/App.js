
import React from 'react';
import { YellowBox } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HeaderNavigator from "./components/Navigation/HeaderNavigator";
import {getCurrentTheme, getStyleSheet} from "./components/StyleSheet";
import {Provider} from "react-redux";
import Store from './Store/configureStore'
import firebase from "firebase"
import {firebaseConfig} from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component{

    constructor(props){
        //YellowBox.ignoreWarnings([""]);
        super(props);
        this.state= {
            seasonStyle : getStyleSheet(),
            currentTheme : getCurrentTheme()
        }
    }

    render() {
        return(
            <Provider store={Store}>
                <NavigationContainer style = {styles.main_container}>
                    <HeaderNavigator/>
                </NavigationContainer>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
});


export default App
