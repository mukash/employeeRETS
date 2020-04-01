import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
class iconOnMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <IconEnt name="menu" style={styles.IconEntStyle} size={35} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconWrapper: {
    marginTop: 24,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#000',
  },
});
export default iconOnMap;
