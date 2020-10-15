import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native'
import TipsItem from "./TipsItem";
import {connect} from "react-redux"

class TipsView extends React.Component {

    constructor(props) {
        super(props);
        this.Saisons = [
            {
                id: '01',
                saison: 'Aider les oiseaux en automne',
                tips: 'Dès l’arrivée des premiers froids, la nourriture commence à se raréfier pour les oiseaux.\n' +
                    '\n' +
                    'Apportez de la nourriture régulièrement pour compenser la raréfaction des ressources alimentaires.'
            },
            {
                id: '02',
                saison: 'Aider les oiseaux en hiver',
                tips: 'Dès l’arrivée des premiers froids, la nourriture commence à se raréfier pour les oiseaux.\n' +
                    '\n' +
                    'Apportez de la nourriture régulièrement pour compenser la raréfaction des ressources alimentaires.'
            },
            {
                id: '03',
                saison: 'Aider les oiseaux au printemps',
                tips: 'Dès l’arrivée des premiers froids, la nourriture commence à se raréfier pour les oiseaux.\n' +
                    '\n' +
                    'Apportez de la nourriture régulièrement pour compenser la raréfaction des ressources alimentaires.'
            },
            {
                id: '04',
                saison: 'Aider les oiseaux en été',
                tips: 'Dès l’arrivée des premiers froids, la nourriture commence à se raréfier pour les oiseaux.\n' +
                    '\n' +
                    'Apportez de la nourriture régulièrement pour compenser la raréfaction des ressources alimentaires.'
            },
        ];

    }

    render() {
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <Text style={[styles.context, {borderColor: theme.highlight, backgroundColor: theme.secondary}]}>
                    Vous pouvez aider les oiseaux de la nature et favoriser leur survie en les aidant à trouver facilement une alimentation adaptée et à garder un habitat approprié.
                </Text>
                <FlatList
                    data={this.Saisons}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TipsItem data={{infos_saison: item}}/>
                    )}
                />
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
    context: {
        width: "95%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 5,
        borderRadius: 10,
        paddingTop : 5,
        paddingBottom : 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        textAlign: 'center',
    },
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(TipsView)
