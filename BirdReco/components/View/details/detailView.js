import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";

class DetailView extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <Text>Details Works</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('SearchView', { params: {} }) }
                >
                    <Text>Retour</Text>
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
    backButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <DetailView {...props} navigation={navigation}/>
}
