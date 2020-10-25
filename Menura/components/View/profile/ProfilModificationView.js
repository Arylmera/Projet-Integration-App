import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"

class ProfilModificationView extends React.Component {
    render() {
        const { navigation } = this.props
        let theme = this.props.currentStyle;
        return (
            <View style={styles.main_container}>
                <Text>Modification du profile Works</Text>
                <TouchableOpacity
                    style={[styles.modifButton, {backgroundColor: theme.primary}]}
                    onPress={() => navigation.navigate('Profil', { params: {} }) }
                >
                    <Text>Save</Text>
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
    modifButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <ProfilModificationView {...props} navigation={navigation}/>
});

