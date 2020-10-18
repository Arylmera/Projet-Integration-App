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
                tips: 'Le gel et la neige limitent l’accès des oiseaux à l’eau et à la nourriture.\n' +
                    '\n' +
                    'Proposez de la nourriture telle que les graines ou/et des boules de graisse pour aider les oiseaux à résister à la période hivernale.\n' +
                    '\n' +
                    'nstallez une baignoire à oiseaux et veillez à ce que l’eau ne soit pas gelée et toujours propre, changez l’eau régulièrement.'
            },
            {
                id: '03',
                saison: 'Aider les oiseaux au printemps',
                tips: 'Il y a 4 fois plus d’oiseaux qu’en hiver, donc les besoins en alimentation augmentent. C’est aussi le début de la période de nidification.\n' +
                    '\n' +
                    'Remplissez régulièrement les mangeoires de nourriture.\n' +
                    '\n' +
                    'Préparez des nichoirs pour offrir aux oiseaux un lieu adapté pour couver et élever leurs petits.'
            },
            {
                id: '04',
                saison: 'Aider les oiseaux en été',
                tips: 'La période de nidification se poursuit pour aboutir à la naissance des petits, qui vont avoir besoin d’une alimentation spécifique pour leur croissance.\n' +
                    '\n' +
                    'De plus, avec la chaleur estivale, l’accès à l’eau pure, vitale pour l’oiseau, est de plus en plus difficile.\n' +
                    '\n' +
                    'Apportez une alimentation complémentaire aux oiseaux qui n’ont pas assez de temps pour collecter la nourriture pour leurs petits et pour eux.\n' +
                    '\n' +
                    'Installez une baignoire pour permettre aux oiseaux de se désaltérer et de se rafraîchir. Vous pouvez également mettre de l’eau dans une brique ou dans des couvercles de confitures…\n' +
                    '\n'

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
