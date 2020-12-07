'use strict'

import React from 'react';
import {
   StyleSheet,
   View,
   ScrollView,
   Image,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {
   Table,
   Row,
   Rows,
} from 'react-native-table-component';
import {Divider} from 'react-native-paper';
import astuce from './data/TipsDataNichePlanAstuces';
import materiel from './data/TipsDataNichePlanMateriels';
import TipsNichePlanAstuces from './TipsNichePlanAstuces';
import TipsNichePlanMateriels from './TipsNichePlanMateriels';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TipsNichePlan extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: this.props.route.params.id,
         titre: this.props.route.params.titreItem,
         description: this.props.route.params.description_plan,
         image: this.props.route.params.image_plan,

         tableHead: [
            'Hôte',
            'Largeur intérieur',
            'Hauteur intérieur',
            'Profondeur intéreur',
            'Trou diamètre ou l x h',
         ],
         tableData1: [
            ['Pigeon colombin', '380', '350', '200', '85'],
            ['Chouette chevêche', '200', '350', '200', '70'],
            ['Chouette hulotte', '250', '600', '250', '120'],
            ['Torcol fourmilier', '130', '250', '130', '32 - 35'],
            ['Huppe fasciée', '150', '280', '150', '67 - 70'],
            ['Pic épeiche', '150', '260', '150', '45 - 50'],
            ['Rougequeue à front blanc', '130', '250', '130', '32 - 46'],
            [
               'Mésanges huppée, noire, nonnette',
               '100',
               '200',
               '100',
               '25 - 27',
            ],
            ['Mésange bleue', '130', '200', '130', '27 - 28'],
            ['Mésange charbonnière', '140', '250', '140', '30 - 32'],
            ['Sittelle torchepot', '140', '250', '140', '40 - 45'],
            ['Grimpereau', '100', '180', '100', '24 - 60'],
            ['Choucas des tours', '180', '400', '180', '70 - 80'],
            ['Moineau friquet', '130', '220', '130', '30 - 32'],
            ['Moineau domestique', '140', '220', '140', '30 - 35'],
         ],
         tableData2: [
            ['Faucon crécerelle', '380', '350', '200', '85'],
            [
               'Bergeronnette grise, Rougegorge Gobemouche gris, Rougequeue noir',
               '120',
               '200',
               '150',
               '150 - 70',
            ],
            ['Choucas des tours', '400', '350', '400', '400 - 130'],
         ],
      };
   }

   render() {
      //console.log(this.state.id);
      let theme = this.props.currentStyle;
      return (
         <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.context, {backgroundColor: theme.accent}]}>
               <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() =>
                     this.props.navigation.navigate(
                        this.props.route.params.root,
                        {
                           oiseaux_nom: this.state.nom,
                        },
                     )
                  }>
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
                  {this.state.titre}
               </Text>
            </View>
            <View>
               <Text h4 style={[{color: theme.highlight}, styles.title]}>
                  Dimensions Optimales :
               </Text>
               <View
                  style={[
                     {backgroundColor: theme.secondary},
                     styles.container,
                  ]}>
                  <Text style={[{color: theme.highlight}, styles.text_item]}>
                     Toutes les dimensions ci-dessous, ainsi que celles des
                     plans sont en mm
                  </Text>
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Nichoirs fermé :
                  </Text>
                  <Table
                     borderStyle={{borderWidth: 2, borderColor: theme.accent}}>
                     <Row
                        data={this.state.tableHead}
                        style={[styles.head, {backgroundColor: theme.primary}]}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                     <Rows
                        data={this.state.tableData1}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                  </Table>
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Nichoirs semi-ouverts :
                  </Text>
                  <Table
                     borderStyle={{borderWidth: 2, borderColor: theme.accent}}>
                     <Row
                        data={this.state.tableHead}
                        style={[styles.head, {backgroundColor: theme.primary}]}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                     <Rows
                        data={this.state.tableData2}
                        textStyle={[{color: theme.highlight}, styles.text]}
                     />
                  </Table>
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Astuces :
                  </Text>
                  <FlatList
                     data={astuce}
                     keyExtractor={(item) => item.id}
                     renderItem={({item}) => (
                        <TipsNichePlanAstuces
                           data={{astuce: item, root: 'TipsNichePlan'}}
                        />
                     )}
                  />
                  <Text style={[{color: theme.highlight}, styles.title_item]}>
                     Matériels :
                  </Text>
                  <FlatList
                     data={materiel}
                     keyExtractor={(item) => item.id}
                     renderItem={({item}) => (
                        <TipsNichePlanMateriels
                           data={{materiel: item, root: 'TipsNichePlan'}}
                        />
                     )}
                  />
               </View>
            </View>
            <View
               style={[
                  styles.item_container,
                  {backgroundColor: theme.secondary},
               ]}>
               <Text h4 style={[{color: theme.highlight}, styles.title]}>
                  Plan :
               </Text>
               <Divider style={[{backgroundColor: theme.highlight}]} />
               <View style={styles.main_container}>
                  <Text style={[{color: theme.highlight}, styles.text_item]}>
                     {this.state.description}
                  </Text>
                  <Image style={styles.image} source={this.state.image} />
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
      margin: 6,
      fontSize: 8,
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
      fontSize: 18,
   },
   text_item: {
      margin: 15,
      textAlign: 'center',
      fontStyle: 'italic',
   },
   image: {
      flex: 1,
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      width: "90%",
      height: 360,
      alignSelf: 'center',
      margin: 5,
      resizeMode: 'contain',
   },
   item_container: {
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
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <TipsNichePlan {...props} navigation={navigation} />;
});
