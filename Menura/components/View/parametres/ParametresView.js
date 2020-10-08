import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import setUpStyleSheet, {getStyleSheet} from "../../StyleSheet";

class ParametresView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentTheme : 'autumn',
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
    }

    _setThemeAutomne() {
        console.log("theme set to autumn");
        this.setState({
            currentTheme: 'autumn'
        });
        setUpStyleSheet('autumn');
    }

    _setThemePrintemps() {
        console.log("theme set to spring");
        this.setState({
            currentTheme: 'spring'
        });
        setUpStyleSheet('spring');
    }

    _setThemeEte() {
        console.log("theme set to summer");
        this.setState({
            currentTheme: 'summer'
        });
        setUpStyleSheet('summer');
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
    },
    theme_container: {
    },
})

export default ParametresView
