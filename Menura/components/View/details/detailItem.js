import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {getStyleSheet, getThemeSecondary} from "../../StyleSheet";

class DetailItem extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            seasonStyle : getStyleSheet()
        }
    }

    render() {
        const oiseaux_nom = this.props.data.oiseau_nom
        const { navigation } = this.props
        return (
            <View style={[styles.main_container,{backgroundColor: getThemeSecondary()}]}>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('DetailOiseaux', { oiseaux_nom : oiseaux_nom, root : this.props.data.root }) }
                >
                <Text style={styles.Title}> {oiseaux_nom} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    touchableOpacity: {
        borderRadius: 5,
        marginLeft: "auto",
        width: "100%",
        padding: 3,
        alignItems: "center",
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <DetailItem {...props} navigation={navigation}/>
}
