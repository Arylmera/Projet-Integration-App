import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';
import {connect} from "react-redux"

class ParametresView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentTheme : 'winter',
        }
    }

    /*
    déclaration variables globales
     */
    _menu = null;

    /**
     * helper link menu
     * @param ref
     */
    setMenuRef = ref => {
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

        this.setState({currentTheme : 'hiver'});
        const action = {type: 'SET_WINTER'};
        this.props.dispatch(action);
    }

    /**
     * helper set theme automne
     * @private
     */
    _setThemeAutomne() {
        this._menu.hide();

        this.setState({currentTheme : 'automne'});
        const action = {type: 'SET_AUTUMN'};
        this.props.dispatch(action);
    }

    /**
     * helper set theme printemps
     * @private
     */
    _setThemePrintemps() {
        this._menu.hide();

        this.setState({currentTheme : 'primtemps'});
        const action = {type: 'SET_SPRING'};
        this.props.dispatch(action);
    }

    /**
     * helper set theme été
     * @private
     */
    _setThemeEte() {
        this._menu.hide();

        this.setState({currentTheme : 'été'});
        const action = {type: 'SET_SUMMER'};
        this.props.dispatch(action);
    }

    /**
     * helper set theme Dark
     * @private
     */
    _setThemeDark() {
        this._menu.hide();

        this.setState({currentTheme : 'nuit'});
        const action = {type: 'SET_DARK'};
        this.props.dispatch(action);
    }

    render() {
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>

                <View style={[styles.lineBox, {backgroundColor: theme.secondary}]}>
                    <Text style={styles.theme_caption}>Choix du thème :</Text>
                    <View style={[styles.theme_menuBox, {backgroundColor: theme.accent}]}>
                        <Menu
                            style={styles.theme_menu}
                            ref={this.setMenuRef}
                            button={<Text onPress={this.showMenu}>{this.state.currentTheme}</Text>}
                        >
                            <MenuItem onPress={this._setThemeWinter.bind(this)} style={[styles.theme_menu_entry ,{backgroundColor: theme.secondary}]}>Hiver</MenuItem>
                            <MenuItem onPress={this._setThemeAutomne.bind(this)} style={[styles.theme_menu_entry ,{backgroundColor: theme.secondary}]}>Automne</MenuItem>
                            <MenuItem onPress={this._setThemePrintemps.bind(this)} style={[styles.theme_menu_entry ,{backgroundColor: theme.secondary}]}>Printemps</MenuItem>
                            <MenuItem onPress={this._setThemeEte.bind(this)} style={[styles.theme_menu_entry ,{backgroundColor: theme.secondary}]}>Eté</MenuItem>
                            <MenuItem onPress={this._setThemeDark.bind(this)} style={[styles.theme_menu_entry ,{backgroundColor: theme.secondary}]}>Noir</MenuItem>
                        </Menu>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 10,
        flexDirection: "column"
    },
    lineBox: {
        flex: 1,
        maxHeight: "10%",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 20,
        margin: "5%"
    },
    theme_caption: {
        flex: 2,
        textAlign: "center",
    },
    theme_menuBox: {
        flex: 1,
        padding: "2%",
        borderRadius: 20,
        alignItems: "center",
        marginRight: "5%"
    },
    theme_menu: {
    },
    theme_menu_entry: {
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(ParametresView)
