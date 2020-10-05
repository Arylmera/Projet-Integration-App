import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";


class OiseauxItem extends React.Component {



    render() {
        console.log(this.props);
        const oiseau = this.props
        const oiseau_name = this.props.displaytitle
        const { navigation } = this.props

        return (

            <View style={styles.main_container}>
                <Text style={styles.nom_oiseaux}> {oiseau.displaytitle} </Text>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('DetailOiseaux', { oiseau_name : oiseau_name }) }
                >
                    <Text style={styles.description}> {oiseau.extract} </Text>
                </TouchableOpacity>
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
    touchableOpacity: {
        borderRadius: 5,
        marginLeft: "auto",
        width: "30%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    },
    nom_oiseaux: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 4
    },
    description: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <OiseauxItem {...props} navigation={navigation}/>
}