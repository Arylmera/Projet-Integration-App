'use strict'

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';




class TipsNichePlanAstuces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.data.astuce.description,
            image: this.props.data.astuce.image,
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
                    <View style={styles.description_container}>
                        <Text
                            style={[
                                styles.description_text,
                                {color: theme.highlight},
                            ]}
                            numberOfLines={5}>
                            {this.state.description}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 100,
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
        width: 50,
        height: 110,
        margin: 5,
        resizeMode: 'contain',
    },
    content_container: {
        flex: 1,
        margin: 15,
    },
    description_container: {
        flex: 7,
    },
    description_text: {
        fontStyle: 'italic',
    },
});

const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(TipsNichePlanAstuces);
