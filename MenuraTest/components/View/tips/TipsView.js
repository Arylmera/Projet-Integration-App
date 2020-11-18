import React from 'react';
import {View, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import TipsItem from './TipsItem';
import {connect} from 'react-redux';
import {ButtonGroup, Button, Icon, Card} from "react-native-elements";
import {useNavigation} from "@react-navigation/core";



class TipsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.Saisons = [
      {
        id: '1',
        saison: 'Automne',
        tips:
          'Dès l’arrivée des premiers froids, la nourriture commence à se raréfier pour les oiseaux.\n' +
          '\n' +
          'Apportez de la nourriture régulièrement pour compenser la raréfaction des ressources alimentaires.',
      },
      {
        id: '2',
        saison: 'Hiver',
        tips:
          'Le gel et la neige limitent l’accès des oiseaux à l’eau et à la nourriture.\n' +
          '\n' +
          'Proposez de la nourriture telle que les graines ou/et des boules de graisse pour aider les oiseaux à résister à la période hivernale.\n' +
          '\n' +
          'Installez une baignoire à oiseaux et veillez à ce que l’eau ne soit pas gelée et toujours propre, changez l’eau régulièrement.',
      },
      {
        id: '3',
        saison: 'Printemps',
        tips:
          'Il y a 4 fois plus d’oiseaux qu’en hiver, donc les besoins en alimentation augmentent. C’est aussi le début de la période de nidification.\n' +
          '\n' +
          'Remplissez régulièrement les mangeoires de nourriture.\n' +
          '\n' +
          'Préparez des nichoirs pour offrir aux oiseaux un lieu adapté pour couver et élever leurs petits.',
      },
      {
        id: '4',
        saison: 'Été',
        tips:
          'La période de nidification se poursuit pour aboutir à la naissance des petits, qui vont avoir besoin d’une alimentation spécifique pour leur croissance.\n' +
          '\n' +
          'De plus, avec la chaleur estivale, l’accès à l’eau pure, vitale pour l’oiseau, est de plus en plus difficile.\n' +
          '\n' +
          'Apportez une alimentation complémentaire aux oiseaux qui n’ont pas assez de temps pour collecter la nourriture pour leurs petits et pour eux.\n' +
          '\n' +
          'Installez une baignoire pour permettre aux oiseaux de se désaltérer et de se rafraîchir. Vous pouvez également mettre de l’eau dans une brique ou dans des couvercles de confitures…\n' +
          '\n',
      },
    ];
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }



  render() {
    const {navigation} = this.props;
    const component1 = () => <Text>Automne</Text>;
    const component2 = () => <Text>Hiver</Text>;
    const component3 = () => <Text>Printemps</Text>;
    const component4 = () => <Text>Été</Text>;
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]
    const { selectedIndex } = this.state;
    let theme = this.props.currentStyle;
    return (
        <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
      <View>
        <View style={[styles.context, {backgroundColor: theme.accent}]}>
          <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={[{height: 40},{borderRadius: 5}, {backgroundColor: theme.primary}]}
              //buttonStyle={{backgroundColor: theme.primary}}
              selectedButtonStyle={{backgroundColor: theme.accent}}
              //selectedTextStyle={{color: theme.highlight}}
              textStyle={{color: theme.highlight}}
              innerBorderStyle={{width: 0, color: 'white'}}

          />
          <Text
              style={[
                styles.list_header,
                {backgroundColor: theme.accent, color: theme.highlight},
              ]}>
            Quelques conseils utiles en fonction des saisons :
          </Text>
        </View>

        <TipsItem
            data={{infos_saison: this.Saisons[this.state.selectedIndex]}} />
      </View>
          <Card containerStyle={{backgroundColor: theme.secondary}}
                wrapperStyle={{backgroundColor: theme.secondary}}
          >
            <Card.Title style={{color: theme.highlight}}>Construction nichoirs</Card.Title>
            <Card.Divider/>
            <Card.Image  source={{ uri: 'https://nichoirs.net/photos/3bal.jpg' }} />
            <Text style={{marginBottom: 10, color: theme.highlight}}>
              Des bonnes idées de constructions avec modèles détaillés
            </Text>
            <Button
                onPress={() => navigation.navigate('TipsNiche')}
                buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor: theme.accent, color: theme.highlight}}
                title='A vos marteaux !' />
          </Card>
          </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  context: {
    padding: 15,
    textAlign: 'center',
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  context_text: {
    fontSize: 18,
    width: '100%',

  },
  tips_list: {
    marginLeft: 5,
    marginRight: 5,
  },
  list_header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 4,
    width: '50%',
    padding: 3,
    alignItems: 'center',
  },
  nichoire: {
    borderRadius: 5,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  }
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};


export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();
  return <TipsView {...props} navigation={navigation} />;
});
