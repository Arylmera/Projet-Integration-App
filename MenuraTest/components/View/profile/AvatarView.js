

import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import avatar from "./data/AvatarData";
import AvatarItem from "../profile/AvatarItem";


class AvatarView extends React.Component {
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
            <FlatList
                data={avatar}
                style={styles.FlatlistItem}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <AvatarItem
                        data={{avatar: item, root: 'AvatarView'}}
                    />
                )}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    FlatlistItem: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        currentStyle: state.currentStyle,
    };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();

    return <AvatarView {...props} navigation={navigation} />;
});
