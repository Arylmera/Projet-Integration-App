import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import QuizItem from './QuizItem';
import question from './data/QuizData';

class QuizView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let theme = this.props.currentStyle;
        return (
            <View
                style={[styles.main_container, {backgroundColor: theme.primary}]}
            >
                    <Text
                        style={[
                            styles.list_header,
                            {backgroundColor: theme.accent, color: theme.highlight},
                        ]}>
                        C'est parti !
                    </Text>
                <FlatList
                    data={question}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <QuizItem
                            data={{question: item, root: 'QuizView'}}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
    },
    list_header: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        // shadow
        shadowColor: 'rgba(0,0,0, .7)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    FlatlistItem: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
})


const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <QuizView {...props} navigation={navigation} />;
});
