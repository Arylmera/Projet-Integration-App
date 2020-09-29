import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";

class ProfileModificationView extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <Text>Modification du profile Works</Text>
                <TouchableOpacity
                    style={styles.modifButton}
                    onPress={() => navigation.navigate('Profile', { params: {} }) }
                >
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modifButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <ProfileModificationView {...props} navigation={navigation}/>
}

