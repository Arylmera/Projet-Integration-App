import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core"
import {connect} from "react-redux"
import firebase from 'firebase'


class ConnexionProfilView extends React.Component {

    constructor(props) {
        super(props);
        this.email = ""
        this.password = ""
        this.state = {
            email: "",
            password: ""
        }
    }

    _emailTextInputChanged(email) {
        this.email = email
        console.log(this.email)
    }

    _passwordTextInputChanged(password) {
        this.password = password
    }

    _signIn(email, password) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in!')
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable email and password sign in your firebase console.')
                }

                console.error(error)
            }
            )
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
                    onPress={() => this._signIn(this.email, this.password)}
                >
                    <Text>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity

                >
                    <Text>inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity

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
