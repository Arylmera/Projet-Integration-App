import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"
import firebase from "firebase";

class ResetPasswordProfilView extends React.Component {

    constructor(props) {
        super(props)
        this.email = ""
        this.state = {

        }
    }

    _emailTextInputChanged(email) {
        this.email = email
    }

    _resetPassword(email) {
        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                console.log('email sent')
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
                <TouchableOpacity
                    onPress={() => this._resetPassword(this.email)}
                >
                    <Text>Email Reset</Text>
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

    return <ResetPasswordProfilView {...props} navigation={navigation}/>
});
