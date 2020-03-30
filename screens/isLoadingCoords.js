import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

class isLoadingCoords extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#02584d" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default isLoadingCoords;
