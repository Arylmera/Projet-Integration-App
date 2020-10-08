import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";

class DetailItem extends React.Component {
    render() {
        const oiseaux_nom = this.props.data.oiseau_nom
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <Text style={styles.Title}> {oiseaux_nom} </Text>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('DetailOiseaux', { oiseaux_nom : oiseaux_nom, root : this.props.data.root }) }
                >
                    <Text>Details Oiseau</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#dddddd"
    },
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    touchableOpacity: {
        borderRadius: 5,
        marginLeft: "auto",
        width: "30%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <DetailItem {...props} navigation={navigation}/>
}
