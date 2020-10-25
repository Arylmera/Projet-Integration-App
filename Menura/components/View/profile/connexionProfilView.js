import React from 'react'
import { Alert, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core"
import {connect} from "react-redux"
import firebase from 'firebase'


class ConnexionProfilView extends React.Component {

    constructor(props) {
        super(props);
        this.email = ""
        this.password = ""
        this.state = {
        }
    }

    componentDidMount() {
        this._checkIfLoggedIn()
    }

    _checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Profil')
            }
            else {
                this.props.navigation.navigate('ConnexionProfil')
            }
        })
    }

    _emailTextInputChanged(email) {
        this.email = email
    }

    _passwordTextInputChanged(password) {
        this.password = password
    }

    _signIn(email, password, navigation) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in!')
                navigation.navigate('Profil', { params: {} })
            })
            .catch(error => {
                console.error(error)
                Alert.alert(error.toString())
            })
    }

    render() {
        const { navigation } = this.props;
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this._emailTextInputChanged(email)}
                />
                <TextInput
                    placeholder="mot de passe"
                    onChangeText={(password) => this._passwordTextInputChanged(password)}
                />
                <TouchableOpacity
                    onPress={() => this._signIn(this.email, this.password, navigation)}
                >
                    <Text>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('InscriptionProfil')}
                >
                    <Text>inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordProfil')}
                >
                    <Text>mot de passe oublié ?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <ConnexionProfilView {...props} navigation={navigation}/>
});
