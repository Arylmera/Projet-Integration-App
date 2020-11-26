import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

class QuizItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reponse1: this.props.data.question.reponse1,
            reponse2: this.props.data.question.reponse2,
            reponse3: this.props.data.question.reponse3,
            reponse4: this.props.data.question.reponse4,
            reponseCorrecte: this.props.data.question.reponseCorrecte,
            image: this.props.data.question.image,
            helperText: '',
            helperTextColor: '',
            disable: false,
            opacity: 1,
            score: 0,
        };
    }

    _checkResponse(reponse){
        if (reponse === this.state.reponseCorrecte) {
            console.log('correct !');
            this.setState({
                helperText: 'Bien joué !',
                helperTextColor: 'green',
                disable: true,
                opacity: 0.4,
            });
        }
        else {
            console.log('faux !');
            this.setState({
                helperText: 'Essaie encore !',
                helperTextColor: 'red',
                disable: true,
                opacity: 0.4,
            });
        }
    }

    render() {
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.secondary}]}>
                <Image
                    style={styles.image}
                    source={this.state.image}
                />
                <TouchableOpacity
                    disabled={this.state.disable}
                    style={[styles.button, {backgroundColor: theme.accent, opacity: this.state.opacity}]}
                    onPress={() => this._checkResponse(this.state.reponse1)}
                >
                    <Text>
                        {this.state.reponse1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={this.state.disable}
                    style={[styles.button, {backgroundColor: theme.accent, opacity: this.state.opacity}]}
                    onPress={() => this._checkResponse(this.state.reponse2)}
                >
                    <Text>
                        {this.state.reponse2}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={this.state.disable}
                    style={[styles.button, {backgroundColor: theme.accent, opacity: this.state.opacity}]}
                    onPress={() => this._checkResponse(this.state.reponse3)}
                >
                    <Text>
                        {this.state.reponse3}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={this.state.disable}
                    style={[styles.button, {backgroundColor: theme.accent, opacity: this.state.opacity}]}
                    onPress={() => this._checkResponse(this.state.reponse4)}
                >
                    <Text>
                        {this.state.reponse4}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={[styles.helper, {color: this.state.helperTextColor}]}
                >
                    {this.state.helperText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 300,
        flexDirection: 'column',
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        // shadow
        shadowColor: 'rgba(0,0,0, .7)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    image: {
        resizeMode: 'contain',
        height: '50%',
        width: '100%',
        marginTop: 5,
        // shadow
        shadowColor: 'rgba(0,0,0, .7)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    button: {
        borderRadius: 5,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
    },
    helper: {
    }
})


const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <QuizItem {...props} navigation={navigation} />;
});

