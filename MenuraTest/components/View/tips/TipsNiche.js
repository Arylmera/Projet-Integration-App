import React from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Divider} from "react-native-paper";



class TipsNiche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.nichoire = [
            {
                id: '1',
                title: '',
                description: '',
                image: '',
            }
        ]
    }




    render() {
        let theme = this.props.currentStyle;
        return (
            <ScrollView style={{backgroundColor: theme.primary, flex: 1}}>
            <View>
                <View style={[styles.context, {backgroundColor: theme.accent}]}>
                    <Text style={[
                        styles.list_header,
                        {backgroundColor: theme.accent, color: theme.highlight},
                    ]}>
                        Ce sont les nichoirs les plus communs, ceux que l'on installe généralement au jardin. Leur forme et leurs dimensions conviennent en effet à toutes les espèces qui vivent près de l'homme. On pourra simplement donner la préférence à certains oiseaux en adaptant la taille du trou d'envol (se reporter au tableau "dimensions des nichoirs").
                    </Text>
                </View>
                <View style={[styles.main_container, {backgroundColor: theme.secondary}]}>
                <View style={[styles.title, {backgroundColor: theme.secondary}]}>
                    <Text style={[styles.title_text, {color: theme.highlight}]}>
                        le nichoir Boîte à lettres
                    </Text>
                </View>
                <Divider style={[{backgroundColor: theme.highlight}]} />
                <Text
                    style={[
                        styles.item,
                        {backgroundColor: theme.secondary, color: theme.highlight},
                    ]}>
                    Tips
                </Text>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
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
    title: {

        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    title_text: {
        fontSize: 28,
        textAlign: 'center',
        padding: 5,
    },
    item: {

        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 14,
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
    list_header: {
        textAlign: 'justify',
        fontSize: 12,
        padding: 10,
        fontWeight: 'bold',
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
    return <TipsNiche {...props} navigation={navigation} />;
});
