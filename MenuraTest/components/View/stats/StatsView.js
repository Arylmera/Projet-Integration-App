import React from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {getDataStorage} from '../../../functions/storageHelper';
import LineChart from "react-native-chart-kit/dist/line-chart";
import {getHistoriqueAll} from '../../../api/historique_api'
import {getOiseaux} from "../../../api/oiseaux_api";

class StatsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         historiqueListe: [],
         historiqueListeNom: [],
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

   render() {
      //console.log(this.state.historiqueListeNom);
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
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(StatsView);
