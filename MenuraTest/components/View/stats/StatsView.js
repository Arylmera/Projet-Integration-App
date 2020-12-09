import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   ScrollView,
   Dimensions,
   ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {getDataStorage} from '../../../functions/storageHelper';
import {getHistoriqueByID} from '../../../api/historique_api';
import {useNavigation} from '@react-navigation/core';
import PieChart from 'react-native-chart-kit/dist/PieChart';
import LineChart from 'react-native-chart-kit/dist/line-chart';
import Icon from 'react-native-vector-icons/MaterialIcons';

class StatsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         prenom: '',
         historique: [],
         countTotal: 0,
         premier: {},
         dernier: {},
         countByOiseau: {},
         dataLine: [0],
         dataPie: [],
         record: [],
      };
   }

   /**
    * au chargement
    */
   componentDidMount() {
      this._checkIfLoggedIn();
      this._reloadTheme();
   }

   /**
    * vérification si l'utilisateur est connécté et récupère ses infos
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({
               prenom: user.displayName.split(' ')[1],
            });
            this._getStatistiques(user);
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   /**
    * fonction de récupération des statistiques sur les données de l'utilisateur
    * @param user
    * @private
    */
   _getStatistiques(user) {
      user
         .getIdToken(true)
         .then((idToken) => {
            getHistoriqueByID(user.uid, idToken)
               .then((data) => {
                  if (data.data.length !== 0) {
                     let donnees = data.data;
                     let countTotal = this._getTotal(donnees);
                     let countByOiseau = this._getCountByOiseau(donnees);
                     this.setState({
                        historique: donnees,
                        countTotal: countTotal,
                        premier: this._getFirst(donnees, countTotal),
                        dernier: this._getLast(donnees),
                        countByOiseau: countByOiseau,
                        dataPie: this._handleDataPie(countByOiseau),
                        dataLine: this._handleDataLine(donnees),
                        record: this._getRecord(countByOiseau),
                        isLoading: false,
                     });
                  } else {
                     this.props.navigation.navigate('noData');
                  }
               })
               .catch((error) => {
                  console.log(error);
               });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   /**
    * construction des données du graphique en tarte
    * @param oiseaux
    * @returns {[]}
    * @private
    */
   _handleDataPie(oiseaux) {
      let data = [];
      for (let [key, value] of Object.entries(oiseaux)) {
         let couleur = this._getRandomColor();
         let nom = key;
         if (nom.length > 12) {
            let handle = nom.split(' ');
            nom = handle[0];
            nom += ' ';
            nom += handle[1].substring(0, 1).toUpperCase();
            nom += handle[1].substring(1, 2);
            nom += '.';
         }
         data.push({
            name: nom,
            population: value,
            color: couleur,
            legendFontColor: this.props.currentStyle.highlight,
            legendFontSize: 12,
         });
      }
      data.sort(function (a, b) {
         return b.population - a.population;
      });
      return data;
   }

   /**
    * construction des données du graphique en ligne
    * @param oiseaux
    * @returns {number[]}
    * @private
    */
   _handleDataLine(oiseaux) {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      oiseaux.forEach((i) => {
         let mois = new Date(i.date).getUTCMonth();
         data[mois]++;
      });
      return data;
   }

   /**
    * calcul du total des détections
    * @param donnees
    * @returns {*}
    * @private
    */
   _getTotal(donnees) {
      return donnees.length;
   }

   /**
    * retourne le premier oiseau détecté
    * @param donnees
    * @param len
    * @returns {*}
    * @private
    */
   _getFirst(donnees, len) {
      return donnees[len - 1];
   }

   /**
    * retourne le dernier oiseau détecté
    * @param donnees
    * @returns {*}
    * @private
    */
   _getLast(donnees) {
      return donnees[0];
   }

   /**
    * calcul le nombre de détection par espèce
    * @param donnees
    * @returns {{}}
    * @private
    */
   _getCountByOiseau(donnees) {
      let count = {};
      donnees.forEach((i) => {
         count[i.oiseau.normalize('NFC')] =
            (count[i.oiseau.normalize('NFC')] || 0) + 1;
      });
      return count;
   }

   /**
    * calcul l'oiseau le plus détecté et l'oiseau le moins détecté
    * @param countByOiseau
    * @returns {[]}
    * @private
    */
   _getRecord(countByOiseau) {
      let max = 0;
      let min = Infinity;
      let record = [];
      for (let [key, value] of Object.entries(countByOiseau)) {
         if (value > max) {
            max = value;
            record[0] = value;
            record[1] = key;
         }
         if (value < min) {
            min = value;
            record[2] = value;
            record[3] = key;
         }
      }
      return record;
   }

   /**
    * mise en forme de la date
    * @param date
    * @returns {string}
    * @private
    */
   _renderDate(date) {
      let tempDate = new Date(date);
      let year = tempDate.getFullYear();
      let month = tempDate.getUTCMonth() + 1;
      let day = tempDate.getUTCDate();
      let dayInt = tempDate.getUTCDay();
      let week = [
         'lundi',
         'mardi',
         'mercredi',
         'jeudi',
         'vendredi',
         'samedi',
         'dimanche',
      ];
      let dayName = week[dayInt - 1];
      return dayName + ' ' + day + '/' + month + '/' + year;
   }

   /**
    * retourne une couleur aléatoire
    * @returns {string}
    * @private
    */
   _getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   }

   /**
    * chargement du thème de l'utilisateur
    * @private
    */
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

   /**
    * render
    * @returns {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      const dataPie = this.state.dataPie;
      const screenWidth = Dimensions.get('window').width;
      const chartConfigPie = {
         backgroundGradientFrom: '#1E2923',
         backgroundGradientFromOpacity: 0,
         backgroundGradientTo: '#08130D',
         backgroundGradientToOpacity: 0.5,
         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      };
      const dataLine = {
         labels: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'jui',
            'Jui',
            'Aou',
            'sep',
            'oct',
            'nov',
            'dec',
         ],
         datasets: [
            {
               data: this.state.dataLine,
            },
         ],
      };
      const chartConfigLine = {
         backgroudColor: theme.accent,
         backgroundGradientFrom: theme.primary,
         backgroundGradientFromOpacity: 0,
         backgroundGradientTo: theme.primary,
         backgroundGradientToOpacity: 0,
         decimalPlaces: 0,
         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
         propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: theme.accent,
            fill: theme.highlight,
         },
         propsForBackgroundLines: {
            strokeOpacity: 1,
            stroke: theme.secondary,
            strokeDasharray: [2],
         },
         propsForLabels: {
            stroke: theme.accent,
         },
      };
      return (
         <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            {this.state.isLoading ? (
               <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#000000" />
               </View>
            ) : (
               <View>
                  <View
                     style={[styles.welcome, {backgroundColor: theme.primary}]}>
                     <Text style={[styles.titre, {color: theme.highlight}]}>
                        Bienvenue {this.state.prenom}
                     </Text>
                  </View>
                  <View
                     style={[styles.header, {backgroundColor: theme.accent}]}>
                     <Text style={[styles.titre, {color: theme.highlight}]}>
                        Vos statistiques
                     </Text>
                  </View>
                  <View style={styles.charts}>
                     <View
                        style={[
                           styles.pie_container,
                           {backgroundColor: theme.primary},
                        ]}>
                        <Text
                           style={[
                              styles.texte,
                              {
                                 color: theme.highlight,
                                 marginBottom: 10,
                                 fontSize: 18,
                              },
                           ]}>
                           Proportion des détections par espèce
                        </Text>
                        <PieChart
                           data={dataPie}
                           width={screenWidth}
                           height={200}
                           chartConfig={chartConfigPie}
                           accessor="population"
                           backgroundColor="transparent"
                           paddingLeft="10"
                           paddingRight="10"
                           avoidFalseZero={true}
                        />
                     </View>
                     <View
                        style={[
                           styles.line_container,
                           {backgroundColor: theme.primary},
                        ]}>
                        <Text
                           style={[
                              styles.texte,
                              {
                                 color: theme.highlight,
                                 marginBottom: 20,
                                 fontSize: 18,
                              },
                           ]}>
                           Nombre de détections par mois
                        </Text>
                        <LineChart
                           data={dataLine}
                           width={screenWidth}
                           height={256}
                           verticalLabelRotation={60}
                           chartConfig={chartConfigLine}
                           bezier
                        />
                     </View>
                  </View>
                  <View
                     style={[
                        styles.header,
                        {backgroundColor: theme.accent, marginTop: 20},
                     ]}>
                     <Text style={[styles.titre, {color: theme.highlight}]}>
                        Récapitulatif
                     </Text>
                  </View>
                  <View
                     style={[styles.recap, {backgroundColor: theme.primary}]}>
                     <Text
                        style={[
                           styles.texte,
                           styles.recap_parapgraphe,
                           {color: theme.highlight},
                        ]}>
                        {this.state.prenom} vous avez déjà détecté{' '}
                        {this.state.countTotal} oiseaux depuis que vous avez
                        rejoint l'équipe Menura !
                     </Text>
                     <Text
                        style={[
                           styles.texte,
                           styles.recap_parapgraphe,
                           {color: theme.highlight},
                        ]}>
                        L'oiseau le plus courant près de chez vous semble être{' '}
                        {this.state.record[1]} avec {this.state.record[0]}{' '}
                        détection(s).
                     </Text>
                     <Text
                        style={[
                           styles.texte,
                           styles.recap_parapgraphe,
                           {color: theme.highlight},
                        ]}>
                        Par contre, {this.state.record[3]} est bien plus rare
                        avec seulement {this.state.record[2]} détection(s).
                     </Text>
                     <View
                        style={[
                           styles.bird_container,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text
                           style={[
                              styles.texte,
                              styles.bird_container_title,
                              {color: theme.highlight},
                           ]}>
                           Premier oiseau détecté:
                        </Text>
                        <View
                           style={[
                              styles.bird_info_container,
                              {backgroundColor: theme.primary},
                           ]}>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="waves"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this.state.premier.oiseau}
                              </Text>
                           </View>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="home"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this.state.premier.localisation}
                              </Text>
                           </View>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="query-builder"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this._renderDate(this.state.premier.date)}
                              </Text>
                           </View>
                        </View>
                     </View>
                     <View
                        style={[
                           styles.bird_container,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text
                           style={[
                              styles.texte,
                              styles.bird_container_title,
                              {color: theme.highlight},
                           ]}>
                           Dernier oiseau détecté:
                        </Text>
                        <View
                           style={[
                              styles.bird_info_container,
                              {backgroundColor: theme.primary},
                           ]}>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="waves"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this.state.dernier.oiseau}{' '}
                              </Text>
                           </View>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="home"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this.state.dernier.localisation}{' '}
                              </Text>
                           </View>
                           <View style={styles.bird_info_container_line}>
                              <Icon
                                 name="query-builder"
                                 size={18}
                                 color={theme.highlight}
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                 }}
                              />
                              <Text
                                 style={[
                                    styles.texte,
                                    styles.bird_info,
                                    {color: theme.highlight},
                                 ]}>
                                 {this._renderDate(this.state.dernier.date)}
                              </Text>
                           </View>
                        </View>
                     </View>
                  </View>
               </View>
            )}
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   loading: {
      marginTop: '50%',
      justifyContent: 'center',
   },
   charts: {
      marginRight: 20,
   },
   header: {
      fontSize: 20,
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   welcome: {
      fontSize: 20,
      alignItems: 'center',
      paddingTop: 10,
   },
   recap: {
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 5,
      padding: 5,
   },
   titre: {
      marginTop: 5,
      marginBottom: 10,
      padding: 5,
      fontSize: 22,
      fontWeight: 'bold',
   },
   texte: {
      fontSize: 16,
   },
   pie_container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 25,
      marginLeft: '5%',
      marginRight: '7%',
      borderRadius: 5,
      alignItems: 'center',
   },
   line_container: {
      flex: 1,
      marginTop: 20,
      marginLeft: '5%',
      marginRight: '7%',
      borderRadius: 5,
      alignItems: 'center',
   },
   recap_parapgraphe: {
      padding: 5,
   },
   bird_container: {
      flex: 1,
      width: '90%',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   bird_info: {
      fontSize: 16,
   },
   bird_info_container: {
      flex: 1,
      padding: 10,
      margin: 10,
      borderRadius: 5,
   },
   bird_container_title: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
   },
   bird_info_container_line: {
      marginLeft: 30,
      flexDirection: 'row',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <StatsView {...props} navigation={navigation} />;
});
