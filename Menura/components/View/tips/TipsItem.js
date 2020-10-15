import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from "react-redux"
import {Divider} from "react-native-paper";

class TipsItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        let theme = this.props.currentStyle;
        const saison = this.props.data.infos_saison.saison
        const tips = this.props.data.infos_saison.tips
        return (
            <View style={[styles.main_container, {backgroundColor: theme.secondary}]}>
                <Text style={styles.saison}>{saison}</Text>
                <Divider/>
                <Text style={[styles.item, {backgroundColor: theme.secondary}]}>{tips}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        margin: 10,
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
            }}),

    },
    saison: {
        flex: 1,
        fontSize: 28,
        textAlign: 'center',
        padding: 5,
    },
    item: {
        flex : 3,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 14,
    },

})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(TipsItem)
