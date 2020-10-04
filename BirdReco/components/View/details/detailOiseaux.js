import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import {getWikiInfo, getWikiSandBox} from "../../../api/wikiapi";
import {useNavigation} from "@react-navigation/core";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

class DetailOiseaux extends React.Component {

    constructor(props){
        super(props);
        this.state={
            windowW: 400,
            windowH: 400,
            oiseaux_nom : this.props.route.params.oiseaux_nom,
            wikiInfo:[],
            wikiSandBoxInfo: [],
            image : " ",
            imageH : 0,
            isLoading : true
        }
        this._loadinfo();
    }

    _loadinfo(){
        getWikiInfo(this.state.oiseaux_nom).then(data => {
            if(data) {
                //console.log(data);
                this.setState({wikiInfo: data, image: data.originalimage.source, imageH : data.originalimage.height});
                this.setState( {isLoading : false} )
            }
        });
    }

    _find_dimesions(layout){
        const {width, height} = layout;
        this.setState({windowW: width, windowH: height});
    }

    render() {
        const { navigation } = this.props

        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => navigation.navigate('SearchView') }>
                    <FontAwesomeIcon icon = {faAngleLeft} size={25}/>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView_container} key={this.state.windowW} onLayout={(event) => { this._find_dimesions(event.nativeEvent.layout) }}>
                    <View style={[styles.header_container]}>
                        <Image style={[styles.image, {height: this.state.windowW}]} source={{uri : this.state.image }}/>
                        <Text style={styles.Title}>{this.state.wikiInfo.displaytitle}</Text>
                    </View>
                    <View style={styles.body_container}>
                        <Text>{this.state.wikiInfo.extract}</Text>
                        {this.state.wikiSandBoxInfo}
                    </View>
                </ScrollView>
                { this.state.isLoading ?
                    <View style={styles.loading_container}>
                        <ActivityIndicator size='large' />
                    </View>
                    : null
                }
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
    scrollView_container: {
        marginTop: 35
    },
    header_container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    body_container: {
        margin: 10,
    },
    Title : {
        fontSize: 30,
        fontWeight: 'bold',
    },
    touchableOpacity: {
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)",
        position: "absolute",
        left: 5,
        top: 5,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        height: "100%",
        width: "100%",
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .7)',
                shadowOffset: { height:0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5
            },
        }),
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <DetailOiseaux {...props} navigation={navigation}/>
}
