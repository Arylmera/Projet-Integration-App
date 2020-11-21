import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';


class TipsSaison extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        const {navigation} = this.props;
        let theme = this.props.currentStyle;
        return (
            <ScrollView style={{backgroundColor: theme.primary, flex: 1}}>
            <View>
                <View style={[styles.context, {backgroundColor: theme.accent}]}>
                    <Text
                        style={[
                            styles.list_header,
                            {backgroundColor: theme.accent, color: theme.highlight},
                        ]}>
                        Quelques infos utiles :
                    </Text>
                </View>
            </View>
            </ScrollView>
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
});

const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <TipsSaison {...props} navigation={navigation} />;
});
