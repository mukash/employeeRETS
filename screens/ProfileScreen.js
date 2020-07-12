import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import {Right} from 'native-base';
import Speedometer from 'react-native-speedometer-chart';

export default class Profile extends Component {
  state = {
    name: '',
    token: '',
    lat: '',
    lng: '',
    isLoading: true,
    fcmToken: '',
    emid: '',
  };
  async componentDidMount() {
    try {
      const emid = await AsyncStorage.getItem('emid');
      this.setState({emid: emid});
      console.log(this.state.emid);
      this.getFcmToken(emid);
      this.forGround();
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('name');
      this.setState({token: token});
      this.getProgress(token);
      this.setState({name: name});
      //  this.getData();
      this.getData();
      this.loadingCoords();
    } catch (e) {
      console.error(error);
    }
  }
  /******************************************FCM Part********************************************************/
  sendToken = () => {
    fetch('http://rets.codlers.com/api/employee/fcmToken.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fcm: this.state.fcmToken,
        emid: this.state.emid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.Message);
      })
      .catch(error => {
        alert(error);
      });
  };
  //1
  async getFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcm');
    fetch('http://rets.codlers.com/api/employee/fcmToken.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fcm: fcmToken,
        emid: this.state.emid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.Message);
      })
      .catch(error => {
        // alert(error);
      });
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcm', fcmToken);
      }
    }
    this.setState({fcmToken: fcmToken});
    console.log('fcm:', this.state.fcmToken);
  }
  forGround = () => {
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data.rets == 'job') {
        this.props.navigation.navigate('Map', {
          job_id: remoteMessage.data.job_id,
        });
      } else if (remoteMessage.data.rets == 'feedback') {
        this.props.navigation.navigate('Profile', {
          job_id: remoteMessage.data.job_id,
        });
      }
      console.log('Message handled in the background!', remoteMessage);
    });

    /// return unsubscribe;
  };
  /******************************************FCM functions ended******************************************/

  /************************************************getting rating**********************************************************************/
  getProgress = token => {
    fetch('http://rets.codlers.com/api/employee/calRating.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        let jobDone = responseJson[0];
        let rating = parseFloat(responseJson[1]).toFixed(1);
        this.setState({rating: rating});
        this.setState({jobDone: jobDone});
      })
      .catch(error => {
        console.error(error);
      });
  };
  /***************************************************ending*************************************************************************************/
  getData = () => {
    this.watchId = Geolocation.watchPosition(
      position => {
        let lng = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log('longitude: ' + lng + ' ' + 'Latitude: ' + lat);
        //console.log(position);
        fetch('http://rets.codlers.com/api/employee/trackingemp.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: this.state.token,
            longitude: lng,
            latitude: lat,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson['message'] != undefined) {
              console.log(responseJson.message);
            }
          })
          .catch(error => {
            alert(error);
          });
        // console.log(this.state.lat + '  ' + this.state.lng);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 500,
        fastestInterval: 5000,
        forceRequestLocation: true,
        distanceFilter: 0,
      },
    );
  };

  _logOut = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.removeItem('fcm');
    this.props.navigation.navigate('stack');
  };
  stopTracking = () => {
    this.watchId != null && Geolocation.clearWatch(this.watchId);
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
  loadingCoords = () => {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  };
  render() {
    return (
     
      <View style={styles.container}>
       
        <View>
          <View style={styles.header}>
            <IconEnt
              name="menu"
              style={styles.IconEntStyle}
              size={35}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </View>
          <Image
            style={styles.avatar}
            source={require('../assets/admin.jpg')}
          />
          <View style={styles.body}>
          
            <Text style={styles.name}>{this.state.name}</Text>

            <Text style={styles.info}>RATING: {this.state.rating}/5</Text>
            <Text style={styles.description}>
              JOBS DONE: {this.state.jobDone}
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.stopTracking}>
              <Text style={{color: '#fff'}}>End Shift</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._logOut}
              style={styles.buttonContainer}>
              <Text style={{color: '#fff'}}>Logout</Text>
            </TouchableOpacity>
      
         
          </View>
        </View>
        <View>
           
          </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  ratingJobs: {
    flexDirection: 'row-reverse',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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
    flex: 1,
    alignItems: 'center',
    padding: 30,
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
    fontSize: 20,
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
    width: '60%',

    borderRadius: 30,
    backgroundColor: '#439889',
  },
});
