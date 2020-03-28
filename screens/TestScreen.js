import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Button, TextInput} from 'react-native';
//import all the components we are going to use.

export default class FirstPage extends Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {
      username: '',
    };
  }
  static navigationOptions = {
    //Setting the header of the screen
    title: 'First Page',
  };

  render() {
    return (
      //View to hold our multiple components
      <View style={styles.container}>
        {/*Input to get the value from the user*/}
        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({username})}
          placeholder={'Enter Any value'}
          style={styles.input}
        />
        {/*Button to go to the next activity*/}
        <Button
          title="Go Next"
          //Button Title
          onPress={() =>
            this.props.navigation.navigate('Testt', {
              myName: 'Mukash Wasti',
              name: this.state.username,
            })
          }
          //On click of the button we will send
          //the data as a Json from here to the Second Screen using navigation prop
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#DBDBD6',
  },
});
