import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IconEnt from 'react-native-vector-icons/Entypo';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: '',
      email: '',
      emid: '',
    };
  }
  static navigationOptions = {
    title: 'Welcome Login',
    headerStyle: {backgroundColor: '#02584d'},
    headerTitleStyle: {color: '#fff'},
  };
  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Turn on location Permission',
          message: 'kindly give permistion to use the app ',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the app now');
      } else {
        console.log('you cannot use');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  login = () => {
    fetch('https://jhnerd.com/rets/api/employee/loginemp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        pass: this.state.pass,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['error'] != undefined) {
          alert(responseJson.error);
          console.log(responseJson);
        } else if (responseJson['message'] != undefined) {
          let res = responseJson;
          this.storeData(res);
          this.props.navigation.navigate('Dashboard');
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

  storeData = async res => {
    try {
      await AsyncStorage.setItem('token', res.employee.token);
      await AsyncStorage.setItem('name', res.employee.empname);
      await AsyncStorage.setItem('emid', res.employee.emid);
      alert;
    } catch (e) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.backgroutMajor}>
        <View>
          <Image
            style={{
              width: 200,
              height: 250,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop:'-20%'
            }}
            source={require('../assets/img.png')}
          />
        </View>
        <View>
        <View style={styles.IconEntStyle1}>
              < IconEnt
                name="mail"
                style={styles.IconEntStyle}
                size={21}
                
              />
              </View>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Email"
            placeholderTextColor="black"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            onSubmitEditing={() => this.password.focus()}
          />
          <View style={styles.IconEntStyle1}>
              < IconEnt
                name="lock"
                style={styles.IconEntStyle}
                size={21}
                
              />
              </View>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            onChangeText={pass => this.setState({pass})}
            ref={input => (this.password = input)}
          />
           <View style={styles.button}>
          <TouchableOpacity onPress={this.login} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroutMajor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputBox: {
    width: 300,
  //  backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: '15%',
    fontSize: 16,
    color: 'black',
    marginVertical: '5%',
  },
  button: {
    width: 300,
    backgroundColor: '#439889',
    borderRadius: 25,
    marginVertical: '6%',
    paddingVertical: '4%',
    marginBottom:'-15%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  IconEntStyle:{
    marginBottom: '-1%',
    color: '#439889',
    marginHorizontal: '3%',
    marginVertical: '4%'
  },
  IconEntStyle1: {
    marginBottom: '-14%'

  },
});
export default LoginScreen;
