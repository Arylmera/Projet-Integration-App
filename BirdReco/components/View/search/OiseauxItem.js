import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'


class OiseauxItem extends React.Component {



    render() {
        const oiseau  = this.props.data

        return (

                <View style={styles.content_container}>
                        <Text style={styles.nom_oiseaux}>{oiseau.name}</Text>
                        <Text style={styles.nom_oiseaux}>{oiseau.description}</Text>
                </View>

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    nom_oiseaux: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    }
})

export default OiseauxItem