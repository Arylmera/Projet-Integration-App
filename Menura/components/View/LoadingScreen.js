import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import firebase from "firebase"


class LoadingScreen extends React.Component {

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

    render() {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

}

export default LoadingScreen
