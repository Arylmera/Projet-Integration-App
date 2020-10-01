import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import {getWikiInfo} from "../../../api/wikiapi";
import {useNavigation} from "@react-navigation/core";
import {SafeAreaView} from "react-native-web";

class DetailOiseaux extends React.Component {

    constructor(props){
        super(props);
        this.state={
            oiseaux_nom : this.props.route.params.oiseaux_nom,
            wikiInfo:[],
            image : " "
        }
        this._loadinfo();
    }

    _loadinfo(){
        getWikiInfo(this.state.oiseaux_nom).then(data => {
            if(data) {
                console.log(data)
                this.setState({wikiInfo: data, image: data.originalimage.source });
            }
        });
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <ScrollView>
                    <View style={styles.header_container}>
                        <Image style={styles.image} source={{uri : this.state.image }}/>
                        <Text style={styles.Title}>{this.state.wikiInfo.displaytitle}</Text>
                    </View>
                    <Text>{this.state.wikiInfo.extract}</Text>
                    <View style={styles.body_container}>

                    </View>
                    <View style={styles.footer_container}>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => navigation.navigate('SearchView') }
                    >
                        <Text>Retour</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_container: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20,
    },
    body_container: {
        width: '100%',
        marginTop: 15,
        margin: 10,
    },
    footer_container: {

    },
    Title : {
        fontSize: 30,
        fontWeight: 'bold',
    },
    touchableOpacity: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        height: "100%",
        width: "100%",
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <DetailOiseaux {...props} navigation={navigation}/>
}
