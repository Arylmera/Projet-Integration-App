import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';


class TipsNiche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <Text>Ici on va mettre les schémas des niches</Text>
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
