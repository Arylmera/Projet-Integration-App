import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import {connect} from "react-redux"

class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: "NickName",
            name: "User name",
            lastName: "User lastName",
            profileIcon: "../../assets/images/profileIcon.png",
        }
    }

    render() {
        const { navigation } = this.props;
        let theme = this.props.currentStyle;
        return (
            <ScrollView style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <View style={styles.container_row}>
                    <View style={styles.headerProfile}>
                        <Text style={styles.nickNameStyle}> {this.state.nickName} </Text>
                        <Text style={styles.nameStyle}> {this.state.name} </Text>
                        <Text style={styles.lastNameStyle}> {this.state.lastName} </Text>
                    </View>
                    <Image source={{uri: this.state.profileIcon }} style={[styles.profileIcon, {backgroundColor: theme.highlight}]}/>
                </View>
                <View style={styles.container_row}>
                    <View style={styles.body_container}>
                        <View style={styles.body_info}>
                            <Text>Body infos</Text>
                        </View>
                        <View style={styles.body_footer}>
                        <TouchableOpacity
                            style={[styles.modifButton, {backgroundColor: theme.secondary}]}
                            onPress={() => navigation.navigate('ModidifProfile', { params: {} }) }
                        >
                            <Text>Modifier</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    container_row: {
        margin: 10,
        flexDirection: "row",
        alignContent: 'space-between'
    },
    body_container: {
        flex: 1,
        flexDirection: "column"
    },
    body_info: {
        flex: 1,
    },
    body_footer: {
        flex: 1,
    },
    headerProfile: {
        flex: 1,
        justifyContent: "center"
    },
    nickNameStyle: {
        marginRight: 'auto',
        fontSize: 25,
        fontWeight: 'bold'
    },
    nameStyle: {
        marginTop: 20,
        marginRight: 'auto',
        fontSize: 20
    },
    lastNameStyle: {
        marginTop: 5,
        marginRight: 'auto',
        fontSize: 20
    },
    profileIcon: {
        flex: 1,
        marginTop: 10,
        borderRadius: 100,
        width: 150,
        height: 150
    },
    modifButton: {
        marginLeft: "auto",
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();

    return <ProfileView {...props} navigation={navigation}/>
});
