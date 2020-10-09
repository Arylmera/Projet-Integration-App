import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';
import setUpStyleSheet, {getCurrentTheme, getStyleSheet, getThemePrimary, getThemeSecondary } from "../../StyleSheet";

class ParametresView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentTheme : getCurrentTheme(),
            seasonStyle : getStyleSheet()
        }
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    _setThemeWinter() {
        console.log("theme set to winter");
        this.setState({
            currentTheme: 'winter'
        });
        setUpStyleSheet('winter');
        this._menu.hide();
    }

    _setThemeAutomne() {
        console.log("theme set to autumn");
        this.setState({
            currentTheme: 'autumn'
        });
        setUpStyleSheet('autumn');
        this._menu.hide();
    }

    _setThemePrintemps() {
        console.log("theme set to spring");
        this.setState({
            currentTheme: 'spring'
        });
        setUpStyleSheet('spring');
        this._menu.hide();
    }

    _setThemeEte() {
        console.log("theme set to summer");
        this.setState({
            currentTheme: 'summer'
        });
        setUpStyleSheet('summer');
        this._menu.hide();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.theme_container}>
                    <Text>Choix du thème :</Text>
                        <Menu
                            style={styles.theme_menu}
                            ref={this.setMenuRef}
                            button={<Text onPress={this.showMenu}>{this.state.currentTheme}</Text>}
                        >
                            <MenuItem onPress={this._setThemeWinter.bind(this)}>Hiver</MenuItem>
                            <MenuItem onPress={this._setThemeAutomne.bind(this)}>Automne</MenuItem>
                            <MenuItem onPress={this._setThemePrintemps.bind(this)}>Printemps</MenuItem>
                            <MenuItem onPress={this._setThemeEte.bind(this)}>Eté</MenuItem>
                        </Menu>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: getThemePrimary()
    },
    theme_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    theme_menu: {
        backgroundColor: getThemeSecondary()
    }
})

export default ParametresView
