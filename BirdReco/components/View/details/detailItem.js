import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";

class DetailItem extends React.Component {

_loadinfo(){
    getWikiInfo(this.oiseaux_nom).then(data => {
        if(data) {
            this.setState({wikiInfo: data});
        }
    });
    console.log(this.state.wikiInfo);
}

    render() {
        const oiseaux_nom = this.props.data
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <Text> Oiseau Item </Text>
                <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigation.navigate('DetailOiseaux', { params: {oiseaux_nom : this.state.oiseaux_nom} }) }
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

    return <DetailItem {...props} navigation={navigation}/>
}