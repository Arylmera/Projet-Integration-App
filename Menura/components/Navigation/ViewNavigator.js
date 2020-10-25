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
import {connect} from "react-redux"

const Tab = createBottomTabNavigator()

class ViewNavigator extends React.Component {

    constructor(props){
        super(props);
        this.state= {

        }
    }

    render() {
        let theme = this.props.currentStyle;
        return (
            <Tab.Navigator
                initialRouteName = "StatsView"
                tabBarOptions = {{
                    activeTintColor: theme.highlight,
                    activeBackgroundColor: theme.primary,
                    inactiveTintColor: theme.primary,
                    inactiveBackgroundColor: theme.highlight,
                    showIcon: true,
                    labelStyle: {
                        fontSize: 13,
                        padding: 1
                    },
                    style : {
                        borderRadius: 0,
                        backgroundColor: theme.primary,
                        ...Platform.select({
                            ios: {
                                shadowColor: 'rgba(0,0,0, .7)',
                                shadowOffset: { height:0, width: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 5,
                            },
                            android: {
                                elevation: 5
                            },
                        })
                    }
                }}
            >
                <Tab.Screen style = {[styles.screen,{backgroundColor: theme.primary}]}
                            name = 'StatsView'
                            component = {StatsView}
                            options = {{
                                tabBarLabel: 'Statistiques',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faChartBar} size = {27} color={theme.accent}/>
                                ),
                            }}/>
                <Tab.Screen style = {[styles.screen,{backgroundColor: theme.primary}]}
                            name = 'SearchNavigator'
                            component = {SearchNavigator}
                            options = {{
                                tabBarLabel: 'Recherche',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faSearch} size = {23} color={theme.accent}/>
                                ),
                            }}/>
                <Tab.Screen style = {[styles.screen,{backgroundColor: theme.primary}]}
                            name = 'HistoriqueView'
                            component = {HistoriqueNavigator}
                            options = {{
                                tabBarLabel: 'Historique',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faList} size = {23} color={theme.accent}/>
                                ),
                            }}/>
                <Tab.Screen style = {[styles.screen,{backgroundColor: theme.primary}]}
                            name = 'TipsView'
                            component = {TipsView}
                            options = {{
                                tabBarLabel: 'Tips',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faInfoCircle} size = {23} color={theme.accent}/>
                                ),
                            }}/>
                <Tab.Screen style = {[styles.screen,{backgroundColor: theme.primary}]}
                            name = 'ParametresView'
                            component={ParametresView}
                            options = {{
                                tabBarLabel: 'Paramètres',
                                tabBarIcon: (tabInfo) => (
                                    <FontAwesomeIcon icon = {faCog} size = {23} color={theme.accent}/>
                                ),
                            }}
                />
            </Tab.Navigator>
        )
    }
}

let styles = StyleSheet.create({
    screen: {
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(ViewNavigator)
