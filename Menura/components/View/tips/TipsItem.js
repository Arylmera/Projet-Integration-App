import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class TipsItem extends React.Component {
    render() {
        const saison = this.props.data.infos_saison.saison
        const tips = this.props.data.infos_saison.tips
        return (
            <View style={styles.main_container}>
                <Text style={styles.saison}>{saison}</Text>
                <Text style={styles.item}>{tips}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#6DB565'
    },
    saison: {
        fontSize: 28,
        textAlign: 'center'
    },
    item: {
        backgroundColor: '#6DB565',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 14,
    },

})

export default TipsItem

