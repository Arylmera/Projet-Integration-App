import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import StatsView from '../View/stats/StatsView';
import TipsView from '../View/tips/TipsView';
import ParametresView from '../View/parametres/ParametresView';

import SearchNavigator from './SearchNavigator';
import HistoriqueNavigator from './HistoriqueNavigator';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

class ViewNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <Tab.Navigator
        initialRouteName="StatsView"
        tabBarOptions={{
          activeTintColor: theme.highlight,
          activeBackgroundColor: theme.primary,
          inactiveTintColor: theme.primary,
          inactiveBackgroundColor: theme.highlight,
          showIcon: true,
          labelStyle: {
            fontSize: 13,
            padding: 1,
          },
          style: {
            borderTopWidth: 0,
            borderRadius: 0,
            backgroundColor: theme.primary,
            // shadow
            shadowColor: 'rgba(0,0,0, .7)',
            shadowOffset: {height: 0, width: 0},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 3,
          },
        }}>
        <Tab.Screen
          style={[styles.screen, {backgroundColor: theme.primary}]}
          name="StatsView"
          component={StatsView}
          options={{
            tabBarLabel: 'Statistiques',
            tabBarIcon: (tabInfo) => (
              <Icon
                name="view-week"
                size={35}
                color={theme.accent}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 0,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          style={[styles.screen, {backgroundColor: theme.primary}]}
          name="SearchNavigator"
          component={SearchNavigator}
          options={{
            tabBarLabel: 'Recherche',
            tabBarIcon: (tabInfo) => (
              <Icon
                name="search"
                size={33}
                color={theme.accent}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 0,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          style={[styles.screen, {backgroundColor: theme.primary}]}
          name="HistoriqueView"
          component={HistoriqueNavigator}
          options={{
            tabBarLabel: 'Historique',
            tabBarIcon: (tabInfo) => (
              <Icon
                name="list"
                size={40}
                color={theme.accent}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -3,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          style={[styles.screen, {backgroundColor: theme.primary}]}
          name="TipsView"
          component={TipsView}
          options={{
            tabBarLabel: 'Tips',
            tabBarIcon: (tabInfo) => (
              <Icon
                name="info"
                size={28}
                color={theme.accent}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 3,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          style={[styles.screen, {backgroundColor: theme.primary}]}
          name="ParametresView"
          component={ParametresView}
          options={{
            tabBarLabel: 'Paramètres',
            tabBarIcon: (tabInfo) => (
              <Icon
                name="build"
                size={27}
                color={theme.accent}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 3,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

let styles = StyleSheet.create({
  screen: {},
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(ViewNavigator);
