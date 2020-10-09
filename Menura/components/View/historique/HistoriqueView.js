import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import DetailItem from "../details/detailItem";
import {getCurrentTheme, getStyleSheet} from "../../StyleSheet";

class HistoriqueView extends React.Component {

    constructor(props){
        super(props);
        this.state={
            seasonStyle : getStyleSheet(),
            currentTheme : getCurrentTheme(),
            oiseauxListe: ["Mésange","Pic vert","Moineau","Bergeronnette grise","Buse variable","Chardonneret élégant","Bruant Jaune","Paridae"]
        }
    }

    render() {
        return (
            <View style={[styles.main_container, this.state.seasonStyle.primary]}>
                <FlatList
                    data={this.state.oiseauxListe}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <DetailItem data={{oiseau_nom: item, root: 'HistoriqueView'}}/>
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

export default HistoriqueView
