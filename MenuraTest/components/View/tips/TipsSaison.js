import React from 'react';
import {
   StyleSheet,
   View,
   ScrollView,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {Row, Rows, Table} from 'react-native-table-component';
import nourriture from './data/TipsDataNourriture';
import TipsSaisonNourritureItem from './TipsSaisonNourritureItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TipsSaison extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: this.props.route.params.id,
         saison: this.props.route.params.saison,
         descriptionAbris: this.props.route.params.description_abris,
         descriptionNourriture: this.props.route.params.descriptionNourriture,
         tableHead: [
            'Aliments',
            'Pics',
            'Grives',
            'Merles',
            'Mésanges',
            'Rougorge',
            'Pinsons',
            'Verdiers',
            'Moineaux',
         ],
         tableData: [
            ['Tournesol strié', 'X', '', '', 'X', '', 'X', 'X', 'X'],
            ['Maïs fortement concassé', '', '', '', '', '', 'X', 'X', 'X'],
            ['Avoine aplatie', '', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            ['Riz cuit', '', '', '', 'X', 'X', 'X', 'X', 'X'],
            ['Millet rond', '', '', '', '', 'X', 'X', 'X', 'X'],
            ['Noix de coco, arachides', 'X', '', '', 'X', '', '', '', ''],
            ['Noix, noisette, farine', 'X', '', '', 'X', '', '', '', 'X'],
            ['Amandes, noire, nonnette', 'X', '', '', 'X', '', '', '', ''],
            ['Graisse végétale, beurre', 'X', '', '', 'X', 'X', '', '', 'X'],
            ['Suif, saindoux, lard nature', 'X', '', '', 'X', 'X', '', '', 'X'],
            ['Créton de boeuf', '', 'X', 'X', '', '', '', '', ''],
            ['Déchets de viande fraîche', '', '', '', '', '', '', '', 'X'],
            ['Pomme, poire', '', 'X', 'X', '', '', '', '', ''],
            ['Raisins secs', '', 'X', 'X', '', '', '', '', ''],
            ['Feuilles de salade', '', 'X', 'X', '', '', '', '', ''],
            ['Pomme de terre cuite, miettes', '', 'X', 'X', '', '', '', '', ''],
            ['Fromage (non salé)', '', 'X', 'X', 'X', '', '', '', ''],
         ],
      };
   }

   render() {
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      return (
         <ScrollView style={{backgroundColor: theme.primary, flex: 1}}>
            <View style={[styles.context, {backgroundColor: theme.accent}]}>
               <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => navigation.navigate('TipsView', {})}>
                  <Icon
                     name="keyboard-arrow-left"
                     size={35}
                     color={theme.highlight}
                  />
               </TouchableOpacity>
               <Text
                  style={[
                     styles.list_header,
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}>
                  Quelques infos utiles en {this.state.saison} {':'}
               </Text>
            </View>
            <View>
               <Text h4 style={[{color: theme.highlight}, styles.title]}>
                  Comment bien nourrir les oiseaux ?
               </Text>
               <View
                  style={[
                     {backgroundColor: theme.secondary},
                     styles.container,
                  ]}>
                  <Text style={[{color: theme.highlight}, styles.text_item]}>
                     {this.state.descriptionNourriture}
                  </Text>
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Tableau récapitulatif des aliments à distribuer :
                  </Text>
                  <Table
                     borderStyle={{
                        borderWidth: 2,
                        borderColor: theme.accent,
                     }}>
                     <Row
                        data={this.state.tableHead}
                        style={[styles.head, {backgroundColor: theme.primary}]}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                     <Rows
                        data={this.state.tableData}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                  </Table>
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Nourritures :
                  </Text>
                  <FlatList
                     data={nourriture}
                     keyExtractor={(item) => item.id}
                     renderItem={({item}) => (
                        <TipsSaisonNourritureItem
                           data={{nourriture: item, root: 'TipsSaison'}}
                        />
                     )}
                  />
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   context: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   list_header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 10,
      fontWeight: 'bold',
   },
   container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column',
      margin: 10,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   text: {
      margin: 2,
      fontSize: 6,
   },
   title: {
      margin: 6,
      textAlign: 'center',
   },
   title_item: {
      margin: 15,
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
   },
   text_item: {
      margin: 15,
      textAlign: 'center',
      fontStyle: 'italic',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(TipsSaison);
