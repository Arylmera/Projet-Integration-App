import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class ProfileView extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.container_row}>
                <Text style={styles.userNameStyle}>Nom de l'utilisateur</Text>
                <Image source={require('../../assets/images/profileIcon.png')}
                       style={styles.profileIcon}/>
                </View>
                <View style={styles.container_row}>
                    <Text>Profile Works</Text>
                </View>
            </View>
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
    userNameStyle: {
        marginTop: 75,
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 'bold'
    },
    profileIcon: {
        marginTop: 10,
        backgroundColor: "rgba(126,211,33,1)",
        borderRadius: 100,
        width: 150,
        height: 150
    }
})

export default ProfileView
