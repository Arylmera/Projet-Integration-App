import React from 'react';
import {StyleSheet, View, ScrollView, Image, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Divider} from "react-native-paper";
import materiel from "./TipsDataNichePlanMateriels";
import TipsNichePlanMateriels from "./TipsNichePlanMateriels";



class TipsMangeoirePlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.id,
            titre: this.props.route.params.titreItem,
            image: this.props.route.params.image_plan,

        };
    }



    render() {
        console.log(this.state.id);
        let theme = this.props.currentStyle;
        return (
            <ScrollView style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <View style={[styles.context, {backgroundColor: theme.accent}]}>
                    <Text
                        style={[
                            styles.list_header,
                            {backgroundColor: theme.accent, color: theme.highlight},
                        ]}>
                        {this.state.titre}
                    </Text>
                </View>
                <View>
                    <View style={[{backgroundColor: theme.secondary},styles.container]}>
                        <Text
                            style={[{color: theme.highlight},styles.title_item]}>
                            Matériels :
                        </Text>
                        <FlatList
                            data={materiel}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <TipsNichePlanMateriels
                                    data={{materiel: item, root: 'TipsMangeoirePlan'}}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={[
                    styles.item_container,
                    {backgroundColor: theme.secondary},
                ]}>
                    <Text
                        h4
                        style={[{color: theme.highlight},styles.title]}>
                        Plan :
                    </Text>
                    <Divider style={[{backgroundColor: theme.highlight}]} />
                    <View
                        style={styles.main_container}>
                        <Image
                            style={styles.image}
                            source={this.state.image}>

                        </Image>
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
        fontSize: 8
    },
    title: {
        margin: 6,
        textAlign: 'center',
    },
    title_item: {
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
        width: 360,
        height: 360,
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
    return <TipsMangeoirePlan {...props} navigation={navigation} />;
});