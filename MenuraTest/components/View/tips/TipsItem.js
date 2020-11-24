import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-paper';
import {Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/core";

class TipsItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      let theme = this.props.currentStyle;
      const id = this.props.data.infos_saison.id;
      const saison = this.props.data.infos_saison.saison;
      const tips = this.props.data.infos_saison.tips;
      const image = this.props.data.infos_saison.image;
      const {navigation} = this.props;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.secondary}]}>
            <View style={[styles.saison, {backgroundColor: theme.secondary}]}>
               <Text style={[styles.saison_title, {color: theme.highlight}]}>
                   {saison}
               </Text>
            </View>
            <Divider style={[{backgroundColor: theme.highlight}]} />
            <View
                style={[
                   styles.item,
                   {backgroundColor: theme.secondary, color: theme.highlight},
                ]}>
                <Image
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                    source={image}
                />
            <Text
                style={[styles.item_text,{color: theme.highlight}]}>
               {tips}
            </Text>
            <Button
                titleStyle={{color: theme.highlight}}
                buttonStyle={[
                    styles.button,
                    {backgroundColor: theme.accent}]}
                onPress={() =>
                    navigation.navigate('TipsSaison', {
                        id: id,
                        root: this.props.data.root,
                    })}
                title="En savoir plus ..."
            />
            </View>
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
    saison_title: {
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
    image: {
        width: null,
        height: 150,
        borderRadius: 4,
        flex: 1,
        resizeMode: 'contain',
    },
    item_text: {
        margin: 15,
        textAlign: 'center',
        fontStyle: 'italic',

    },
    button: {
        borderRadius: 5,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
    const navigation = useNavigation();
    return <TipsItem {...props} navigation={navigation} />;
});
