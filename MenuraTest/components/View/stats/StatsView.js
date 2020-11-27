import React from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {getDataStorage} from '../../../functions/storageHelper';
import LineChart from "react-native-chart-kit/dist/line-chart";
import {getHistoriqueAll} from '../../../api/historique_api'
import {getOiseaux} from "../../../api/oiseaux_api";
import PieChart from "react-native-chart-kit/dist/PieChart";
import {Divider} from "react-native-paper";

class StatsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         historiqueListe: [],
         historiqueListeNom: [],
         historiqueCount: [{"name": "Mésange bleue", "value": 1}, {"name": "Chardonneret élégant", "value": 1}, {"name": "Mésange bleue", "value": 2}, {"name": "Bruant Jaune", "value": 5}],
      };
   }

   _showHistorique(){
      getHistoriqueAll().then((data) => {
         this.setState({historiqueListe: data.data});
         let historiqueNom_loading = [];
         data.data.forEach((oiseau) =>
             historiqueNom_loading.push(oiseau.oiseau),
         );
         this.setState({
            historiqueListeNom: historiqueNom_loading,
         });
         this._countItem(this.state.historiqueListeNom);
      })
   }

   componentDidMount() {
      this._checkIfLoggedIn();
      this._reloadTheme();
      this._showHistorique();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({id: user.uid});
         } else {
            console.log('no user');
         }
      });
   }



   _reloadTheme() {
      getDataStorage('theme_key').then((r) => {
         if (r !== null) {
            if (r === 'winterStyle') {
               const action = {type: 'SET_WINTER'};
               this.props.dispatch(action);
            } else if (r === 'autumnStyle') {
               const action = {type: 'SET_AUTUMN'};
               this.props.dispatch(action);
            } else if (r === 'springStyle') {
               const action = {type: 'SET_SPRING'};
               this.props.dispatch(action);
            } else if (r === 'summerStyle') {
               const action = {type: 'SET_SUMMER'};
               this.props.dispatch(action);
            }
         }
      });
   }

   _countItem(tab) {
      const count = {};
      const result = [];

      tab.forEach(item => {
         if (count[item]) {
            count[item] +=1;
            return
         }
         count[item] = 1
      });
      for(let i in count) {
         let obj = {};
         obj.name = i;
         obj.value = count[i];
         result.push(obj);
      }
      result.sort(function (a, b) {
         return a.value - b.value;
      });
      result.reverse();
      this.setState({historiqueCount: result});
   }

   render() {
      //console.log(this.state.historiqueListeNom);
      //console.log(this.state.historiqueListe);
      let theme = this.props.currentStyle;
      const oiseauNom = this.state.historiqueListeNom;
      return (
          <ScrollView
              style={[styles.main_container, {backgroundColor: theme.primary}]}>
         <View>
            <Text
                style={[
                   styles.list_header,
                   {backgroundColor: theme.accent, color: theme.highlight},
                ]}>
               Statistiques des oiseaux de votre capteur
            </Text>
            <View
                style={[
                   styles.item_container,
                   {backgroundColor: theme.secondary},
                ]}>
               <View
                   style={[
                      styles.container_item,
                      {backgroundColor: theme.secondary},
                   ]}>
                  <Text style={[styles.title_text, {color: theme.highlight}]}>
                     Statistiques générales :
                  </Text>
               </View>
               <Divider style={[{backgroundColor: theme.highlight}]} />
               <View>
                  <LineChart
                      data={{
                         labels: ['Mésange', 'Moineau', 'Pigeon', 'Amaury'],
                         datasets: [
                            {
                               data: [
                                  3,
                                  6,
                                  9,
                                  77,
                                  66,
                                  7,
                               ],
                            },
                         ],
                      }}
                      width={Dimensions.get('window').width - 16} // from react-native
                      height={220}
                      yAxisLabel={'Rs'}
                      chartConfig={{
                         backgroundColor: theme.primary,
                         backgroundGradientFrom: theme.primary,
                         backgroundGradientTo: theme.primary,
                         decimalPlaces: 2, // optional, defaults to 2dp
                         color: (opacity = 255) => theme.accent,
                         style: {
                            borderRadius: 16,
                         },
                      }}
                      bezier
                      style={{
                         marginVertical: 8,
                         borderRadius: 16,

                      }}
                  />
               </View>

            <View>
               <PieChart
                   data={[
                      {
                         name: this.state.historiqueCount[0].name,
                         population: this.state.historiqueCount[0].value,
                         color: 'rgba(131, 167, 234, 1)',
                         legendFontColor: '#7F7F7F',
                         legendFontSize: 11,
                      },
                      {
                         name: this.state.historiqueCount[1].name,
                         population: this.state.historiqueCount[1].value,
                         color: '#F00',
                         legendFontColor: '#7F7F7F',
                         legendFontSize: 11,
                      },
                      {
                         name: this.state.historiqueCount[2].name,
                         population: this.state.historiqueCount[2].value,
                         color: '#ffffff',
                         legendFontColor: '#7F7F7F',
                         legendFontSize: 11,
                      },
                      {
                         name: this.state.historiqueCount[3].name,
                         population: this.state.historiqueCount[3].value,
                         color: 'rgb(0, 0, 255)',
                         legendFontColor: '#7F7F7F',
                         legendFontSize: 11,
                      },
                   ]}
                   width={Dimensions.get('window').width - 16}
                   height={220}
                   chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                         borderRadius: 16,
                      },
                   }}
                   style={{
                      marginVertical: 8,
                      borderRadius: 16,
                   }}
                   accessor="population"
                   backgroundColor="transparent"
                   paddingLeft="15"
                   absolute //for the absolute number remove if you want percentage
               />
            </View>

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
   container_item: {
      flex: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
   },
   title_text: {
      fontSize: 28,
      textAlign: 'center',
      padding: 5,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(StatsView);
