import React from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Button} from "react-native-elements";
import _ from 'lodash';
import {ListItem } from "react-native-elements";


class TipsNicheItem extends React.Component {
    constructor(props) {
        super(props);
       this.state = {
            titre: this.props.data.niche.title,
            description: this.props.data.niche.description,
            image: this.props.data.niche.image,

       };
    }

    render() {
        let theme = this.props.currentStyle;
        return (
                    <View
                        style={[
                            styles.main_container,
                            {backgroundColor: theme.secondary},
                        ]}>
                        <Image
                            style={styles.image}
                           source={this.state.image}

                        />
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>
                                <Text
                                    style={[
                                        styles.title_text,
                                        {color: theme.highlight},
                                    ]}>
                                    {this.state.titre}
                                </Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text
                                    style={[
                                        styles.description_text,
                                        {color: theme.highlight},
                                    ]}
                                    numberOfLines={6}>
                                    {this.state.description}
                                </Text>
                            </View>
                            <View>
                                <Button
                                    titleStyle={{color: theme.highlight}}
                                    buttonStyle={[ styles.button,{
                                        backgroundColor: theme.accent
                                    }]}
                                    //onPress={() => navigation.navigate('TipsNiche')}
                                    title="Plan détaillé"
                                />
                            </View>
                        </View>
                    </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        margin: 10,
        borderRadius: 5,
        // shadow
        shadowColor: 'rgba(0,0,0, .7)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
    },
    content_container: {
        flex: 1,
        margin: 5,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
    },
    description_container: {
        flex: 7,
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
    },
    button: {
        borderRadius: 5,
        marginLeft: 40,
        marginRight: 60,
        marginBottom: 8,
        marginTop: 5,
        padding: 3,
    },
});

const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <TipsNicheItem {...props} navigation={navigation} />;
});