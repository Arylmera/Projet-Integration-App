import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/core";

class SearchView extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <Text>Search Works</Text>

                <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigation.navigate('DetailView', { params: {} }) }
                >
                    <Text>Details Oiseau</Text>
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
    detailButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        backgroundColor: "rgba(126,211,33,0.5)"
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <SearchView {...props} navigation={navigation}/>
}