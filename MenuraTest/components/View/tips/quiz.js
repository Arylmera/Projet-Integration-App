import React from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Quizz extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         toggle: false,
      };
   }
   _onpress() {
      const newState = !this.state.toggle;
      this.setState({toggle: newState});
   }

   _onpress2() {
      const newState = !this.state.toggle;
      this.setState({toggle: newState});
   }

   render() {
      const {toggle} = this.state;
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      const couleur = toggle ? '#95F23C' : '#F0F0F0';
      const couleur2 = toggle ? '#F2763C' : '#F0F0F0';
      return (
         <ScrollView style={{backgroundColor: theme.primary}}>
            <View>
               <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() =>
                     navigation.navigate('TipsView', {
                        oiseaux_nom: this.state.nom,
                     })
                  }>
                  <Icon
                     name="keyboard-arrow-left"
                     size={35}
                     color={theme.highlight}
                  />
               </TouchableOpacity>
            </View>
            <View>
               <Text style={{marginTop: 50, fontSize: 20, marginLeft: 120}}>
                  Devinez l'oiseaux
               </Text>
               <Text>
                  Cliquez une fois pour vérifier, et une deuxième pour cacher
                  les réponses{' '}
               </Text>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/mesange.jpg')}
               />

               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MESANGE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MOINEAU
                  </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HIBOU
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HIRONDELLE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/moineau.jpg')}
               />

               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MESANGE
                  </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MOINEAU
                  </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HIBOU
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HIRONDELLE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/grandduc.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     FAUCON GERFAULT
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     ENGOULEVENT D'EUROPE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     FOU DE BASSAN
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     GRAND DUC D'EUROPE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/PIEBAVARDE.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     LINOTTE MELODIEUSE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     PIGEON RAMIER
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     PIE BAVARDE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     IBIS FALCINELLE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/VERDIER.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     VERDIER D'EUROPE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     TOURNEPIERRE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HUPPE FASCIE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     BUSARD PALE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/bargerousse.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     BARGE ROUSSE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     COUCOU GEAI
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HARLE HUPPE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     BUSARD PALE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/MACREUSE.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MARTINET NOIR
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     COUCOUC GEAI
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HARLE HUPPE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MACREUSE NOIRE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/mouette.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MARTINET NOIR
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     COUCOUC GEAI
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MOUETTE RIEUSE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MACREUSE NOIRE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/tarier.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     HERON POURPRET
                  </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     TARIER DES PRES
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     RALE D'EAU
                  </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     MACREUSE NOIRE
                  </Text>
               </TouchableOpacity>
            </View>
            <View>
               <Image
                  style={styles.photo}
                  source={require('../../../assets/quizz/picvert.jpg')}
               />
               <TouchableOpacity
                  onPress={() => this._onpress()}
                  style={{marginTop: 20, height: 70, backgroundColor: couleur}}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     PICVERT
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     GIVRE DRAINE
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     GOBEMOUCHE GRIS
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this._onpress2()}
                  style={{
                     marginTop: 20,
                     marginBottom: 60,
                     height: 70,
                     backgroundColor: couleur2,
                  }}>
                  <Text
                     style={{
                        color: '#375353',
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                     }}>
                     GRUE CENDRE
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      );
   }
}
const styles = {
   text: {
      fontSize: 30,
   },
   photo: {
      width: 300,
      height: 190,
      marginLeft: 30,
      marginTop: 10,
   },
};

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(Quizz);
