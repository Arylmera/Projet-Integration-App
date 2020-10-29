import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getWikiInfo, getWTFWikipedia} from '../../../api/wikiapi';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faFileAlt} from '@fortawesome/free-solid-svg-icons';

class DetailOiseaux extends React.Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      windowW: 400,
      windowH: 400,
      oiseaux_nom: this.props.route.params.oiseaux_nom,
      oiseaux_latin: null,
      wikiInfo: [],
      wikiWTF: [],
      wikiWTFtext: null,
      wikiWTFInfobox: null,
      image: ' ',
      imageH: 0,
      isLoading: true,
      dataFound: false,
    };
    this._loadinfo();
  }

  /**
   * load info into state from api request
   * @private
   */
  _loadinfo() {
    getWikiInfo(this.state.oiseaux_nom).then((data) => {
      if (data) {
        //console.log(data)
        if (data.title !== 'Not found.') {
          this.setState({
            dataFound: true,
            wikiInfo: data,
            image: data.originalimage.source,
            imageH: data.originalimage.height,
          });
          this._WtfRequest();
          this.setState({isLoading: false});
        } else {
          this.setState({
            isLoading: false,
            dataFound: false,
          });
        }
      }
    });
  }

  /**
   * gestion des requêtes par le plugin WTF wikipedia
   * @private
   */
  _WtfRequest() {
    getWTFWikipedia(this.state.oiseaux_nom).then((data) => {
      if (data) {
        this.setState({wikiWTF: data});
        if (this.state.wikiWTF.sections[0].infoboxes.length > 4) {
          this.setState({
            wikiWTFInfobox: this.state.wikiWTF.sections[0].infoboxes,
          });
        }
        try {
          let nom_latin = null;
          if (this.state.wikiWTF.sections[0]) {
            if (this.state.wikiWTF.sections[0].paragraphs[0].sentences[0]) {
              nom_latin = this.state.wikiWTF.sections[0].paragraphs[0]
                .sentences[0][
                Object.keys(
                  this.state.wikiWTF.sections[0].paragraphs[0].sentences[0],
                )[2]
              ].italic[0];
            } else if (
              this.state.wikiWTF.sections[0].paragraphs[1].sentences[0]
            ) {
              nom_latin = this.state.wikiWTF.sections[0].paragraphs[1]
                .sentences[0][
                Object.keys(
                  this.state.wikiWTF.sections[0].paragraphs[1].sentences[0],
                )[2]
              ].italic[0];
            }
          }
          this.setState({
            oiseaux_latin: nom_latin,
          });

          if (
            this.state.wikiWTF.sections[1].paragraphs[0].sentences[0] &&
            this.state.wikiWTF.sections[1].paragraphs[0].sentences[0].text.slice(
              -1,
            ) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                '\n \n' +
                this.state.wikiWTF.sections[1].paragraphs[0].sentences[0].text,
            });
          } else if (
            this.state.wikiWTF.sections[1].paragraphs[0].text &&
            this.state.wikiWTF.sections[1].paragraphs[0].text.slice(-1) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                '\n \n' + this.state.wikiWTF.sections[1].paragraphs[0].text,
            });
          }

          if (
            this.state.wikiWTF.sections[2].paragraphs[0].sentences[0] &&
            this.state.wikiWTF.sections[2].paragraphs[0].sentences[0].text.slice(
              -1,
            ) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                this.state.wikiWTFtext +
                '\n \n' +
                this.state.wikiWTF.sections[2].paragraphs[0].sentences[0].text,
            });
          } else if (
            this.state.wikiWTF.sections[2].paragraphs[0].text &&
            this.state.wikiWTF.sections[2].paragraphs[0].text.slice(-1) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                this.state.wikiWTFtext +
                '\n \n' +
                this.state.wikiWTF.sections[2].paragraphs[0].text,
            });
          }

          if (
            this.state.wikiWTF.sections[3].paragraphs[0].sentences[0] &&
            this.state.wikiWTF.sections[3].paragraphs[0].sentences[0].text.slice(
              -1,
            ) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                this.state.wikiWTFtext +
                '\n \n' +
                this.state.wikiWTF.sections[3].paragraphs[0].sentences[0].text,
            });
          } else if (
            this.state.wikiWTF.sections[3].paragraphs[0].text &&
            this.state.wikiWTF.sections[3].paragraphs[0].text.slice(-1) !== ':'
          ) {
            this.setState({
              wikiWTFtext:
                this.state.wikiWTFtext +
                '\n \n' +
                this.state.wikiWTF.sections[3].paragraphs[0].text,
            });
          }
        } catch (e) {
          console.log("Can't read wikiWTF");
        }
      }
    });
  }

  /**
   * récupération de la dimension de l'écran après le render de lapp
   * @param layout
   * @private
   */
  _find_dimesions(layout) {
    const {width, height} = layout;
    this.setState({windowW: width, windowH: height});
  }

  /**
   * helper du render de l'infoBox
   * @return {null|*}
   * @private
   */
  _render_infobox() {
    let theme = this.props.currentStyle;
    if (this.state.wikiWTFInfobox) {
      if (this.state.wikiWTFInfobox.length === 5) {
        return (
          <View
            style={[
              styles.infoBox_container,
              {backgroundColor: theme.secondary},
            ]}>
            <Text style={[styles.infoBox_Title, {color: theme.highlight}]}>
              <FontAwesomeIcon
                icon={faFileAlt}
                size={15}
                style={{color: theme.highlight}}
              />{' '}
              Classification
            </Text>
            <View style={styles.infoBox_class}>
              <View style={styles.infoBox_class_categ}>
                <Text style={{color: theme.highlight}}>Règne :</Text>
                <Text style={{color: theme.highlight}}>Embranchement :</Text>
                <Text style={{color: theme.highlight}}>Classe :</Text>
                <Text style={{color: theme.highlight}}>Ordre :</Text>
                <Text style={{color: theme.highlight}}>Famille :</Text>
                <Text style={{color: theme.highlight}}>Genre :</Text>
              </View>
              <View style={styles.infoBox_class_sizer} />
              <View style={styles.infoBox_class_info}>
                <Text style={{color: theme.highlight}}>Animalia</Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[0][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[1][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[2][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[3][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[4][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={[
              styles.infoBox_container,
              {backgroundColor: theme.secondary},
            ]}>
            <Text style={[styles.infoBox_Title, {color: theme.highlight}]}>
              <FontAwesomeIcon
                icon={faFileAlt}
                size={15}
                style={{color: theme.highlight}}
              />{' '}
              Classification
            </Text>
            <View style={[styles.infoBox_class]}>
              <View style={styles.infoBox_class_categ}>
                <Text style={{color: theme.highlight}}>Règne :</Text>
                <Text style={{color: theme.highlight}}>Embranchement :</Text>
                <Text style={{color: theme.highlight}}>Sous-Embr :</Text>
                <Text style={{color: theme.highlight}}>Classe :</Text>
                <Text style={{color: theme.highlight}}>Ordre :</Text>
                <Text style={{color: theme.highlight}}>Famille :</Text>
                <Text style={{color: theme.highlight}}>Genre :</Text>
              </View>
              <View style={styles.infoBox_class_sizer} />
              <View style={styles.infoBox_class_info}>
                <Text style={{color: theme.highlight}}>Animalia</Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[0][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[1][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[2][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[3][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[4][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
                <Text style={{color: theme.highlight}}>
                  {
                    this.state.wikiWTFInfobox[5][
                      Object.keys(this.state.wikiWTFInfobox[0])[0]
                    ].text
                  }
                </Text>
              </View>
            </View>
          </View>
        );
      }
    }
    return null;
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <TouchableOpacity
          style={[styles.touchableOpacity, theme.secondary]}
          onPress={() => navigation.navigate(this.props.route.params.root)}>
          <FontAwesomeIcon icon={faAngleLeft} size={25} />
        </TouchableOpacity>
        {this.state.isLoading ? (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : this.state.dataFound ? (
          <ScrollView
            style={styles.scrollView_container}
            key={this.state.windowW}
            onLayout={(event) => {
              this._find_dimesions(event.nativeEvent.layout);
            }}>
            <View style={[styles.header_container]}>
              {this.state.isLoading || this.state.image !== null ? (
                <Image
                  style={[styles.image, {height: this.state.windowW}]}
                  source={{uri: this.state.image}}
                />
              ) : null}
              <Text style={styles.Title}>
                {this.state.wikiInfo.displaytitle}
              </Text>
              {this.state.oiseaux_latin ? (
                <Text style={styles.Title_latin}>
                  {this.state.oiseaux_latin}
                </Text>
              ) : null}
            </View>
            <View style={[styles.body_container]}>
              {this._render_infobox()}
              {this.state.wikiInfo.extract || this.state.wikiWTFtext ? (
                <View
                  style={[
                    styles.text_extract_container,
                    {backgroundColor: theme.secondary},
                  ]}>
                  <Text
                    style={[
                      styles.text_extract,
                      {
                        color: theme.highlight,
                      },
                    ]}>
                    {this.state.wikiInfo.extract}
                    {this.state.wikiWTFtext}
                  </Text>
                </View>
              ) : null}
            </View>
          </ScrollView>
        ) : (
          <View
            style={[
              styles.error_container,
              {backgroundColor: theme.secondary},
            ]}>
            <Text style={[styles.error_text, {color: theme.highlight}]}>
              Veuillez nous excuser{' '}
            </Text>
            <Text style={[styles.error_text, {color: theme.highlight}]}>
              aucune information n'a trouvée pour cette oiseau
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView_container: {
    marginTop: 35,
  },
  header_container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  body_container: {
    margin: 10,
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  Title_latin: {
    fontSize: 25,
    fontStyle: 'italic',
  },
  touchableOpacity: {
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    top: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  infoBox_container: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  infoBox_Title: {
    flex: 1,
    marginLeft: '25%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoBox_class: {
    flexDirection: 'row',
  },
  infoBox_class_categ: {
    flex: 2,
  },
  infoBox_class_sizer: {
    flex: 1,
  },
  infoBox_class_info: {
    flex: 2,
  },
  text_extract_container: {
    margin: 10,
    marginTop: 0,
    padding: 20,
    borderRadius: 10,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  text_extract: {
    textAlign: 'left',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error_container: {
    padding: 10,
    borderRadius: 10,
  },
  error_text: {
    textAlign: 'center',
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();
  return <DetailOiseaux {...props} navigation={navigation} />;
});
