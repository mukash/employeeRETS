import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
//import DrawerActions from 'react-navigation';
import IconEnt from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
//let name = AsyncStorage.getItem('name');
export default class Profile extends Component {
  constructor(props) {
    super(props);
    //this._loadData();
    this.state = {
      name: '',
      token: '',
    };
  }
  async componentDidMount() {
    try {
      const name = await AsyncStorage.getItem('name');
      const token = await AsyncStorage.getItem('token');
      this.setState({name: name});
      this.setState({token: token});
    } catch (e) {
      console.error(error);
    }
  }
  stopTracking = () => {
    fetch('http://rets.codlers.com/api/employee/logoutemp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['message'] != undefined) {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
          ToastAndroid.showWithGravity(
            responseJson.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconEnt
            name="menu"
            style={styles.IconEntStyle}
            size={35}
            onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
        <Image style={styles.avatar} source={require('../assets/admin.jpg')} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.info}>
              Info Testing testing testing testing
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.stopTracking}>
              <Text>Shift ended</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._logOut}
              style={styles.buttonContainer}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('stack');
  };
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    height: 140,
    justifyContent: 'center',
  },
  IconEntStyle: {
    marginBottom: 75,
    marginLeft: 7,
    color: '#fff',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 100,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 65,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#439889',
  },
});
