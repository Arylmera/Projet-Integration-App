import React from 'react';

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';
import StatsView from "../View/stats/StatsView";
import TipsView from "../View/tips/TipsView";
import ParametresView from "../View/parametres/ParametresView";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import SearchNavigator from "./SearchNavigator";
import HistoriqueNavigator from "./HistoriqueNavigator";
import {getStyleSheet, getThemeAccent, getThemeHigLight, getThemePrimary} from "../StyleSheet";

const Tab = createBottomTabNavigator()

class ViewNavigator extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            seasonStyle : getStyleSheet()
        }
    }

    render() {
        return (
            <Tab.Navigator
                initialRouteName = "StatsView"
                tabBarOptions = {{
                    activeTintColor: getThemeHigLight(),
                    activeBackgroundColor: getThemePrimary(),
                    inactiveTintColor: getThemePrimary(),
                    inactiveBackgroundColor: getThemeHigLight(),
                    showIcon: true,
                    labelStyle: {fontSize: 13},
                }}
            >
                <Tab.Screen style = {styles.screen}
                            name = 'StatsView'
                            component = {StatsView}
                            options = {{
                                tabBarLabel: 'Statistiques',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faChartBar} size = {25} color={getThemeAccent()}/>
                                ),
                            }}/>
                <Tab.Screen style = {styles.screen}
                            name = 'SearchNavigator'
                            component = {SearchNavigator}
                            options = {{
                                tabBarLabel: 'Recherche',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faSearch} size = {23} color={getThemeAccent()}/>
                                ),
                            }}/>
                <Tab.Screen style = {styles.screen}
                            name = 'HistoriqueView'
                            component = {HistoriqueNavigator}
                            options = {{
                                tabBarLabel: 'Historique',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faList} size = {23} color={getThemeAccent()}/>
                                ),
                            }}/>
                <Tab.Screen style = {styles.screen}
                            name = 'TipsView'
                            component = {TipsView}
                            options = {{
                                tabBarLabel: 'Tips',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faInfoCircle} size = {23} color={getThemeAccent()}/>
                                ),
                            }}/>
                <Tab.Screen style = {styles.screen}
                            name = 'ParametresView'
                            component = {ParametresView}
                            options = {{
                                tabBarLabel: 'Paramètres',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faCog} size = {23} color={getThemeAccent()}/>
                                ),
                            }}/>
            </Tab.Navigator>
        )
    }
}

let styles = StyleSheet.create({
    screen: {

    }
})

export default ViewNavigator
