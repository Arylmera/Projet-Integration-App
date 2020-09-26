import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class ParametresView extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Parametres Works</Text>
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

export default ParametresView
