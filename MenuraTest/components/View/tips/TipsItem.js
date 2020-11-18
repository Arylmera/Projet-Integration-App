import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-paper';

class TipsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let theme = this.props.currentStyle;
    const saison = this.props.data.infos_saison.saison;
    const tips = this.props.data.infos_saison.tips;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.secondary}]}>
        <View style={[styles.saison, {backgroundColor: theme.secondary}]}>
          <Text style={[styles.saison_text, {color: theme.highlight}]}>
            {saison}
          </Text>
        </View>
        <Divider style={[{backgroundColor: theme.highlight}]} />
        <Text
          style={[
            styles.item,
            {backgroundColor: theme.secondary, color: theme.highlight},
          ]}>
          {tips}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
    margin: 10,
    borderRadius: 5,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  saison: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  saison_text: {
    fontSize: 28,
    textAlign: 'center',
    padding: 5,
  },
  item: {
    flex: 3,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(TipsItem);
