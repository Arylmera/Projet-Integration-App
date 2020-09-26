import React from 'react';

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';
import SearchView from "../View/SearchView";
import HistoriqueView from "../View/HistoriqueView";
import StatsView from "../View/StatsView";
import TipsView from "../View/TipsView";
import ParametresView from "../View/ParametresView";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

const Tab = createBottomTabNavigator()

function ViewNavigator({ navigation }) {
        return (
                <Tab.Navigator
                    initialRouteName="Statistiques"
                    tabBarOptions = {{
                        activeTintColor: 'rgb(85,143,22)',
                        inactiveTintColor: 'gray',
                        showIcon: true,
                        labelStyle: { fontSize: 13}
                    }}
                >
                    <Tab.Screen style = {styles.screen}
                                name = 'Statistiques'
                                component = {StatsView}
                                options = {{
                                    tabBarLabel: 'Statistiques',
                                    tabBarIcon: (tabInfo) => (
                                        <FontAwesomeIcon icon = {faChartBar} size={25}/>
                                    ),
                                }}/>
                    <Tab.Screen style = {styles.screen}
                                name = 'Recherche'
                                component = {SearchView}
                                options = {{
                                    tabBarLabel: 'Recherche',
                                    tabBarIcon: (tabInfo) => (
                                        <FontAwesomeIcon icon = {faSearch} size={23}/>
                                    ),
                                }}/>
                    <Tab.Screen style = {styles.screen}
                                name = 'Historique'
                                component = {HistoriqueView}
                                options = {{
                                    tabBarLabel: 'Historique',
                                    tabBarIcon: (tabInfo) => (
                                        <FontAwesomeIcon icon = {faList} size={23}/>
                                    ),
                                }}/>
                    <Tab.Screen style = {styles.screen}
                                name = 'Tips'
                                component = {TipsView}
                                options = {{
                                    tabBarLabel: 'Tips',
                                    tabBarIcon: (tabInfo) => (
                                        <FontAwesomeIcon icon = {faInfoCircle} size={23}/>
                                    ),
                                }}/>
                    <Tab.Screen style = {styles.screen}
                                name = 'Paramètres'
                                component = {ParametresView}
                                options = {{
                                    tabBarLabel: 'Paramètres',
                                    tabBarIcon: (tabInfo) => (
                                        <FontAwesomeIcon icon = {faCog} size={23}/>
                                    ),
                                }}/>
                </Tab.Navigator>
        )
}

const styles = StyleSheet.create({
    screen: {

    }
})

export default ViewNavigator
