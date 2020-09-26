import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class TipsView extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Tips Works</Text>
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

export default TipsView
