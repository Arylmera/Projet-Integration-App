import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {getDataStorage} from '../../../functions/storageHelper';
import {getHistoriqueByID} from '../../../api/historique_api'
import {useNavigation} from "@react-navigation/core";
import PieChart from "react-native-chart-kit/dist/PieChart";
import LineChart from "react-native-chart-kit/dist/line-chart";

class StatsTest2View extends React.Component {
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

    componentDidMount() {
        this._checkIfLoggedIn();
        this._reloadTheme();
    }

    /**
     * check si l'utilisateur est connécté et récupère ces info
     * @private
     */
    _checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    prenom: user.displayName.split(' ')[1]
                })
                this._getStatistiques(user)
            } else {
                console.log('no user');
            }
        });
    }

    _getStatistiques(user) {
        user.getIdToken(true)
            .then((idToken) => {
                getHistoriqueByID(user.uid, idToken)
                    .then((data) => {
                        let donnees = data.data;
                        let countTotal = this._getTotal(donnees);
                        let countByOiseau = this._getCountByOiseau(donnees);
                        console.log(countByOiseau)
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
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _handleDataPie(oiseaux) {
        let theme = this.props.currentStyle;
        let data = [];
        for (let [key, value] of Object.entries(oiseaux)) {
            let couleur = this._getRandomColor();
            data.push({
                name: key,
                population: value,
                color: couleur,
                legendFontColor: theme.highlight,
                legendFontSize: 12
            })
        }
        data.sort(function(a, b){return b.population - a.population})
        return data
    }

    _handleDataLine(oiseaux) {
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        oiseaux.forEach((i) => {
            let mois = new Date(i.date).getUTCMonth();
            data[mois] ++;
        });
        return data
    }

    _getTotal(donnees) {
        return donnees.length
    }

    _getFirst(donnees, len) {
        return donnees[len - 1];
    }

    _getLast(donnees) {
        return donnees[0];
    }

    _getCountByOiseau(donnees) {
        let count = {};
        donnees.forEach((i) => { count[i.oiseau] = (count[i.oiseau] || 0) + 1;});
        return count
    }

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
        return record
    }

    _renderDate(date) {
        let tempDate = new Date(date)
        let year = tempDate.getFullYear()
        let month = tempDate.getUTCMonth() + 1
        let day = tempDate.getUTCDate()
        let dayInt = tempDate.getUTCDay()
        let week = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
        let dayName = week[dayInt - 1]
        return dayName + ' ' + day + '/' + month + '/' + year
    }

    _getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
        let theme = this.props.currentStyle;
        const dataPie = this.state.dataPie;
        const screenWidth = Dimensions.get("window").width;
        const chartConfigPie = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        };
        const dataLine = {
            labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'jui', 'Jui', 'Aou', 'sep', 'oct', 'nov', 'dec'],
            datasets: [
                {
                    data: this.state.dataLine,
                }
            ],
        };
        const chartConfigLine = {
            backgroudColor:  theme.accent,
            backgroundGradientFrom: theme.primary,
            backgroundGradientFromOpacity:0,
            backgroundGradientTo: theme.primary,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
                r: "4",
                strokeWidth: "2",
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
            }
        };
        return (
            <ScrollView
                style={[styles.main_container, {backgroundColor: theme.primary}]}
            >
                <View
                    style={[styles.header, {backgroundColor: theme.accent}]}
                >
                <Text style={[styles.titre, {color: theme.highlight}]}>
                    Récapitulatif
                </Text>
                </View>
                {this.state.isLoading ? (
                        <View
                            style={styles.loading}
                        >
                            <ActivityIndicator size="large" color="#000000" />
                        </View>
                ) : (
                <View>
                <View
                    style={[styles.recap, {backgroundColor: theme.primary}]}
                >
                    <Text style={[styles.texte, {color: theme.highlight}]}>
                        Bienvenue {this.state.prenom} vous avez déjà détecté {this.state.countTotal} oiseaux depuis que vous avez rejoint l'équipe Menura !{"\n"}{"\n"}

                        L'oiseau le plus courant près de chez vous semble être {this.state.record[1]} avec {this.state.record[0]} détection(s).{"\n"}
                        Par contre, {this.state.record[3]} est bien plus rare avec seulement {this.state.record[2]} détection(s).{"\n"}{"\n"}

                        Premier oiseau détecté:{"\n"}{"\n"}{this.state.premier.oiseau} à {this.state.premier.localisation} le {this._renderDate(this.state.premier.date)}{"\n"}{"\n"}

                        Dernier oiseau détecté:{"\n"}{"\n"}{this.state.dernier.oiseau} à {this.state.dernier.localisation} le {this._renderDate(this.state.dernier.date)}{"\n"}{"\n"}
                    </Text>
                </View>
                <View
                    style={[styles.header, {backgroundColor: theme.accent}]}
                >
                    <Text style={[styles.titre, {color: theme.highlight}]}>
                        Vos statistiques
                    </Text>
                </View>
                <View
                    style={styles.charts}
                >
                    <View
                        style={[styles.pie_container, {backgroundColor: theme.primary}]}
                    >
                        <Text style={[styles.texte, {color: theme.accent}]}>Proportion des détections par espèce</Text>
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
                        style={[styles.line_container, {backgroundColor: theme.primary}]}
                    >
                        <Text style={[styles.texte, {color: theme.accent}]}>Nombre de détection par mois</Text>
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
    recap: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
    },
    titre: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    texte: {
        fontSize: 16,
        marginBottom: 20,
    },
    pie_container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 25,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    line_container: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <StatsTest2View {...props} navigation={navigation} />;
});
