import React, {Component} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  _loadData = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token == null ? 'stack' : 'Dashboard');
    // console.log(isLoggedIn);
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
export default LoadingScreen;
