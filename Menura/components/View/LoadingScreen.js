import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import firebase from "firebase"
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/core";


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

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <LoadingScreen {...props} navigation={navigation}/>
});
