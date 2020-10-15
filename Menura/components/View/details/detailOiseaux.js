import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import {getWikiInfo, getWTFWikipedia} from "../../../api/wikiapi";
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faFileAlt} from '@fortawesome/free-solid-svg-icons'


class DetailOiseaux extends React.Component {

    /**
     * constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.state={
            windowW: 400,
            windowH: 400,
            oiseaux_nom : this.props.route.params.oiseaux_nom,
            oiseaux_latin: null,
            wikiInfo:[],
            wikiWTF: [],
            wikiWTFtext: '',
            wikiWTFInfobox : null,
            image : " ",
            imageH : 0,
            isLoading : true,
        }
        this._loadinfo();
    }

    /**
     * load info into state from api request
     * @private
     */
    _loadinfo() {
        getWikiInfo(this.state.oiseaux_nom).then(data => {
            if (data) {
                //console.log(data);
                this.setState({wikiInfo: data, image: data.originalimage.source, imageH: data.originalimage.height});
                this.setState({isLoading: false})
            }
        });
        getWTFWikipedia(this.state.oiseaux_nom).then(data => {
            if (data) {
                this.setState({wikiWTF: data})
                if (this.state.wikiWTF.sections[0].infoboxes.length > 4) {
                    this.setState({
                        wikiWTFInfobox: this.state.wikiWTF.sections[0].infoboxes
                    })
                }
                //console.log(this.state.wikiWTF.sections[0])
                try {
                    let nom_latin = null;
                    if (this.state.wikiWTF.sections[0]) {
                        if (this.state.wikiWTF.sections[0].paragraphs[0].sentences[0]) {
                            nom_latin = this.state.wikiWTF.sections[0].paragraphs[0].sentences[0].[Object.keys(this.state.wikiWTF.sections[0].paragraphs[0].sentences[0])[2]].italic[0];
                        } else if (this.state.wikiWTF.sections[0].paragraphs[1].sentences[0]) {
                            nom_latin = this.state.wikiWTF.sections[0].paragraphs[1].sentences[0].[Object.keys(this.state.wikiWTF.sections[0].paragraphs[1].sentences[0])[2]].italic[0];
                        }
                    }
                    this.setState({
                        oiseaux_latin: nom_latin
                    })
                }
                catch (e) {
                    console.log("Can't read wikiWTF")
                }
            }
        });

    }

    /**
     * récupération de la dimension de l'écran après le render de lapp
     * @param layout
     * @private
     */
    _find_dimesions(layout){
        const {width, height} = layout;
        this.setState({windowW: width, windowH: height});
    }

    /**
     * helper du render de l'infoBox
     * @return {null|*}
     * @private
     */
    _render_infobox(){
        let theme = this.props.currentStyle;
        if (this.state.wikiWTFInfobox) {
            if(this.state.wikiWTFInfobox.length === 5) {
                return (
                    <View style = {[styles.infoBox_container, {backgroundColor: theme.secondary}]}>
                        <Text style = {[styles.infoBox_Title, {color: theme.highlight}]}>
                            <FontAwesomeIcon icon = {faFileAlt} size={15} style={{color: theme.highlight}}/> Classification
                        </Text>
                        <View style = {styles.infoBox_class}>
                            <View style = {styles.infoBox_class_categ}>
                                <Text style={{color: theme.highlight}}>Règne :</Text>
                                <Text style={{color: theme.highlight}}>Embranchement :</Text>
                                <Text style={{color: theme.highlight}}>Classe :</Text>
                                <Text style={{color: theme.highlight}}>Ordre :</Text>
                                <Text style={{color: theme.highlight}}>Famille :</Text>
                                <Text style={{color: theme.highlight}}>Genre :</Text>
                            </View>
                            <View style = {styles.infoBox_class_sizer}/>
                            <View style = {styles.infoBox_class_info}>
                                <Text style={{color: theme.highlight}}>Animalia</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[0].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[1].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[2].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[3].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[4].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style = {[styles.infoBox_container, {backgroundColor: theme.secondary}]}>
                        <Text style = {[styles.infoBox_Title, {color: theme.highlight}]}>
                            <FontAwesomeIcon icon = {faFileAlt} size={15} style={{color: theme.highlight}}/> Classification
                        </Text>
                        <View style = {[styles.infoBox_class]}>
                            <View style = {styles.infoBox_class_categ}>
                                <Text style={{color: theme.highlight}}>Règne :</Text>
                                <Text style={{color: theme.highlight}}>Embranchement :</Text>
                                <Text style={{color: theme.highlight}}>Sous-Embr :</Text>
                                <Text style={{color: theme.highlight}}>Classe :</Text>
                                <Text style={{color: theme.highlight}}>Ordre :</Text>
                                <Text style={{color: theme.highlight}}>Famille :</Text>
                                <Text style={{color: theme.highlight}}>Genre :</Text>
                            </View>
                            <View style = {styles.infoBox_class_sizer}/>
                            <View style = {styles.infoBox_class_info}>
                                <Text style={{color: theme.highlight}}>Animalia</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[0].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[1].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[2].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[3].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[4].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                                <Text style={{color: theme.highlight}}>{this.state.wikiWTFInfobox[5].[Object.keys(this.state.wikiWTFInfobox[0])[0]].text}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        return null
    }

    render() {
        const { navigation } = this.props
        let theme = this.props.currentStyle;
        console.log(theme);
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <TouchableOpacity
                    style={[styles.touchableOpacity, theme.secondary]}
                    onPress={() => navigation.navigate(this.props.route.params.root) }>
                    <FontAwesomeIcon icon = {faAngleLeft} size={25}/>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView_container} key={this.state.windowW} onLayout={(event) => { this._find_dimesions(event.nativeEvent.layout) }}>
                    <View style={[styles.header_container]}>
                        { this.state.isLoading ?
                            <View style={styles.loading_container}>
                                <ActivityIndicator size='large' />
                            </View>
                            :
                            <Image style={[styles.image, {height: this.state.windowW}]} source={{uri : this.state.image }}/>
                        }
                        <Text style={styles.Title}>{this.state.wikiInfo.displaytitle}</Text>
                        {
                            this.state.oiseaux_latin ?
                                <Text style={styles.Title_latin}>
                                    {this.state.oiseaux_latin}
                                </Text>
                                : null
                        }
                    </View>
                    <View style={[styles.body_container]}>
                        {this._render_infobox()}
                        <Text style={[styles.text_extract, {backgroundColor: theme.secondary}]}>
                            {this.state.wikiInfo.extract}
                        </Text>
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
    Title_latin: {
        fontSize: 25,
        fontStyle: 'italic'
    },
    touchableOpacity: {
        borderRadius: 5,
        alignItems: "center",
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
    infoBox_container: {
        flexDirection: "column",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .7)',
                shadowOffset: { height:0, width: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 2
            }})
    },
    infoBox_Title: {
        flex: 1,
        marginLeft: "25%",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    infoBox_class: {
        flexDirection: "row"
    },
    infoBox_class_categ: {
        flex: 2
    },
    infoBox_class_sizer: {
        flex: 1
    },
    infoBox_class_info: {
        flex: 2
    },
    text_extract: {
        textAlign: 'center',
        margin: 5,
        padding: 10,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .7)',
                shadowOffset: { height:0, width: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 2
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

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();
    return <DetailOiseaux {...props} navigation={navigation}/>
})
