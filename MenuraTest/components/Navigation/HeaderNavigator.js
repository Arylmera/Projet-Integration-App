import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewNavigator from './ViewNavigator';
import ProfilNavigator from './ProfilNavigator';
import {connect} from 'react-redux';
import LoadingNavigator from './LoadingNavigator';
import HeaderIcon from '../../functions/headerIcon';

const Stack = createStackNavigator();

class HeaderNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        screenOptions={{
            headerTitleAlign: 'center',
          headerTintColor: theme.highlight,
          headerStyle: {
            backgroundColor: theme.primary,
            // shadow
            shadowColor: 'rgba(0,0,0, .7)',
            shadowOffset: {height: 0, width: 0},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
          },
        }}>
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Views"
          component={ViewNavigator}
          options={{
            title: this.state.title,
            headerRight: () => <HeaderIcon data={{theme: theme}} />,
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilNavigator}
          options={{
            title: 'Profil',
          }}
        />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(HeaderNavigator);
