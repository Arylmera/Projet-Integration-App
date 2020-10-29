import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ParametresView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: 'Theme',
    };
  }

  /*
    déclaration variables globales
     */
  _menu = null;

  /**
   * helper link menu
   * @param ref
   */
  setMenuRef = (ref) => {
    this._menu = ref;
  };

  /**
   * helper affichage menu
   */
  showMenu = () => {
    this._menu.show();
  };

  /**
   * helper set theme hiver
   * @private
   */
  _setThemeWinter() {
    this._menu.hide();

    this.setState({currentTheme: 'Hiver'});
    const action = {type: 'SET_WINTER'};
    this.props.dispatch(action);
  }

  /**
   * helper set theme automne
   * @private
   */
  _setThemeAutomne() {
    this._menu.hide();

    this.setState({currentTheme: 'Automne'});
    const action = {type: 'SET_AUTUMN'};
    this.props.dispatch(action);
  }

  /**
   * helper set theme printemps
   * @private
   */
  _setThemePrintemps() {
    this._menu.hide();

    this.setState({currentTheme: 'Primtemps'});
    const action = {type: 'SET_SPRING'};
    this.props.dispatch(action);
  }

  /**
   * helper set theme été
   * @private
   */
  _setThemeEte() {
    this._menu.hide();

    this.setState({currentTheme: 'Eté'});
    const action = {type: 'SET_SUMMER'};
    this.props.dispatch(action);
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <View style={[styles.lineBox, {backgroundColor: theme.secondary}]}>
          <Text style={[styles.theme_caption, {color: theme.highlight}]}>
            Choix du thème :
          </Text>
          <View style={[styles.theme_menuBox, {backgroundColor: theme.accent}]}>
            <Menu
              style={styles.theme_menu}
              ref={this.setMenuRef}
              button={
                <Text
                  style={[
                    styles.theme_caption_text,
                    {color: theme.highlight, fontSize: 15},
                  ]}
                  onPress={this.showMenu}>
                  {this.state.currentTheme}
                </Text>
              }>
              <MenuItem
                onPress={this._setThemeWinter.bind(this)}
                style={[
                  styles.theme_menu_entry,
                  {backgroundColor: theme.secondary},
                ]}>
                <Text style={{color: theme.highlight}}>Hiver</Text>
              </MenuItem>
              <MenuItem
                onPress={this._setThemeAutomne.bind(this)}
                style={[
                  styles.theme_menu_entry,
                  {backgroundColor: theme.secondary},
                ]}>
                <Text style={{color: theme.highlight}}>Automne</Text>
              </MenuItem>
              <MenuItem
                onPress={this._setThemePrintemps.bind(this)}
                style={[
                  styles.theme_menu_entry,
                  {backgroundColor: theme.secondary},
                ]}>
                <Text style={{color: theme.highlight}}>Printemps</Text>
              </MenuItem>
              <MenuItem
                onPress={this._setThemeEte.bind(this)}
                style={[
                  styles.theme_menu_entry,
                  {backgroundColor: theme.secondary},
                ]}>
                <Text style={{color: theme.highlight}}>Eté</Text>
              </MenuItem>
            </Menu>
          </View>
        </View>
        <Icon
          name="add"
          size={30}
          color="#900"
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
  },
  lineBox: {
    flex: 1,
    maxHeight: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    margin: '5%',
  },
  theme_caption: {
    flex: 2,
    fontSize: 16,
    textAlign: 'center',
  },
  theme_menuBox: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: '5%',
  },
  theme_caption_text: {
    padding: '5%',
  },
  theme_menu: {},
  theme_menu_entry: {},
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(ParametresView);
