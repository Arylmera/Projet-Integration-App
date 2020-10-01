import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class DetailOiseaux extends React.Component {

constructor(props){
    super(props);
    this.state={
        oiseaux_nom : " ",
        wikiInfo:[]
    }
    this._loadinfo();
}

_loadinfo(){
    getWikiInfo(this.oiseaux_nom).then(data => {
        if(data) {
            this.setState({wikiInfo: data});
        }
    });
    console.log(this.state.wikiInfo);
}

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DetailOiseaux