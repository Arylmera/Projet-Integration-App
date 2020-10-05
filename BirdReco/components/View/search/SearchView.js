import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import DetailItem from '../details/detailItem'

class SearchView extends React.Component {

    constructor(props){
        super(props);
        this.state={
            oiseauxListe: ["Mésange","Pic vert","Moineau","Bergeronnette grise","Buse variable","Chardonneret élégant","Bruant Jaune","Paridae"]
        }
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.state.oiseauxListe}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <DetailItem data={{oiseau_nom: item, root: 'SearchView'}}/>
                    )}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "column",
    },
    detailButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(126,211,33,0.5)"
    },
    FlatlistItem: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <SearchView {...props} navigation={navigation}/>
}


