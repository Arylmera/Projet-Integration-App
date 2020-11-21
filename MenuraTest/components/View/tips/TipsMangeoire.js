import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Button} from "react-native-elements";
import niche from "./TipsDataNiche";
import TipsNicheItem from "./TipsNicheItem";
import mangeoire from './TipsDataMangeoire';
import TipsMangeoireItem from "./TipsMangeoireItem";


class TipsMangeoire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        const {navigation} = this.props;
        let theme = this.props.currentStyle;
        return (
            <View style={{backgroundColor: theme.primary, flex: 1}}>
                <View style={[styles.context, {backgroundColor: theme.accent}]}>
                    <Text
                        style={[
                            styles.list_header,
                            {backgroundColor: theme.accent, color: theme.highlight},
                        ]}>
                        Quelques idées de constructions de mangeoires :
                    </Text>
                </View>
                <FlatList
                    data={mangeoire}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TipsMangeoireItem
                            data={{mangeoire: item, root: 'TipsMangeoire'}}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    return <TipsMangeoire {...props} navigation={navigation} />;
});
