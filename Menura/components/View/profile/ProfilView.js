import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"
import firebase from "firebase";
import {getUtilisateur} from "../../../api/utilisateur_api";

class ProfilView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "User name",
            nom: "User lastName",
            email: "email",
            profileIcon: "../../assets/images/profileIcon.png",
            password: ""
        }
    }

    componentDidMount() {
        this._checkIfLoggedIn()
    }

    _getUtilisateur(email) {
        getUtilisateur(email).then(data =>
            this.setState({nom: data.data[0].nom, prenom: data.data[0].prenom})
        )
    }

    _checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let email = user.email
                this._getUtilisateur(email)
                this.setState({email: email})
            }
            else {
                this.props.navigation.navigate('ConnexionProfil')
            }
        })
    }

    _logOut() {
        firebase.auth()
            .signOut()
            .then( () => {
                console.log("déconnecté")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _deleteAccount() {
        const user = firebase.auth().currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.password
        );
        user.reauthenticateWithCredential(credential)
            .then(() => console.log("authentifié !"))
            .catch((error) => console.log(error))
        user.delete()
            .then(() => {
                console.log("compte supprimé")
                this.props.navigation.navigate('ConnexionProfil')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { navigation } = this.props;
        let theme = this.props.currentStyle;
        return (
            <ScrollView style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <View style={styles.container_row}>
                    <View style={styles.headerProfile}>
                        <Text style={styles.nameStyle}> {this.state.prenom} </Text>
                        <Text style={styles.lastNameStyle}> {this.state.nom} </Text>
                    </View>
                    <Image source={{uri: this.state.profileIcon }} style={[styles.profileIcon, {backgroundColor: theme.highlight}]}/>
                </View>
                <View style={styles.container_row}>
                    <View style={styles.body_container}>
                        <View style={styles.body_info}>
                            <Text>{this.state.email}</Text>
                        </View>
                        <View style={styles.body_footer}>
                        <TouchableOpacity
                            style={[styles.modifButton, {backgroundColor: theme.secondary}]}
                            onPress={() => navigation.navigate('ModidifProfil', { params: {} }) }
                        >
                            <Text>Modifier</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.modifButton, {backgroundColor: theme.secondary}]}
                    onPress={() => this._logOut() }
                >
                    <Text>déconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modifButton, {backgroundColor: theme.secondary}]}
                    onPress={() => this._deleteAccount() }
                >
                    <Text>supprimer compte</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    container_row: {
        margin: 10,
        flexDirection: "row",
        alignContent: 'space-between'
    },
    body_container: {
        flex: 1,
        flexDirection: "column"
    },
    body_info: {
        flex: 1,
    },
    body_footer: {
        flex: 1,
    },
    headerProfile: {
        flex: 1,
        justifyContent: "center"
    },
    nameStyle: {
        marginRight: 'auto',
        fontSize: 25,
        fontWeight: 'bold'
    },
    lastNameStyle: {
        marginTop: 20,
        marginRight: 'auto',
        fontSize: 20
    },
    profileIcon: {
        flex: 1,
        marginTop: 10,
        borderRadius: 100,
        width: 150,
        height: 150
    },
    modifButton: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        borderRadius: 5,
        width: "35%",
        padding: 3,
        alignItems: "center",
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <ProfilView {...props} navigation={navigation}/>
});
