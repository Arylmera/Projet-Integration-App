import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';

class HeaderIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.data.theme;
    return (
      <View style={styles.headerIcon}>
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('Profil'));
          }}>
          <Image
            source={require('../assets/images/profileIcon.png')}
            style={[styles.profileIcon, {tintColor: theme.highlight}]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();
  return <HeaderIcon {...props} navigation={navigation} />;
});
