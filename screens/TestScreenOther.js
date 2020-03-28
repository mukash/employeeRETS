import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Text} from 'react-native';
//import all the components we are going to use.

export default class SecondPage extends Component {
  static navigationOptions = {
    //Setting the header of the screen
    title: 'Second Page',
  };

  render() {
    const {navigation} = this.props;
    const myName = navigation.getParam('myName');
    const name = navigation.getParam('name');
    return (
      //View to hold our multiple components
      <View style={styles.container}>
        <Text>
          You are on SecondPage and the value passed from the first screen is
        </Text>
        {/*Using the navigation prop we can get the value passed from the first Screen*/}
        <Text style={styles.TextStyle}></Text>
        <Text style={{marginTop: 16}}>name: {JSON.stringify(myName)}</Text>
        <Text style={{marginTop: 16}}>name: {JSON.stringify(name)}</Text>
        {/*If you want to check the value is passed or not, 
         you can use conditional operator.*/}
        <Text style={styles.TextStyle}>some thing</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#f00',
  },
});
