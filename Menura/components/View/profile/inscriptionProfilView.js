import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"

class inscriptionProfilView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Text> Inscription View Works</Text>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <inscriptionProfilView {...props} navigation={navigation}/>
});
