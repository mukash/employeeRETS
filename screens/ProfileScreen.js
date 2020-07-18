import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import StarRating from 'react-native-star-rating';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
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
      //this.getData();
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
        let jobDone = responseJson['count'];
        let rating = parseFloat(responseJson['average']).toFixed(1);

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
            <View>
              <View style={styles.nameWrapper}>
                <Text style={styles.name}>{this.state.name}</Text>
              </View>
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Text style={{fontSize: 15}}>Rating and reviews:</Text>
                <Text style={{fontSize: 75}}>{this.state.rating}</Text>
                <View style={{width: '40%'}}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.rating}
                    //selectedStar={rating => this.onStarRatingPress(rating)}
                    fullStarColor="#439889"
                    emptyStarColor="#439889"
                    starSize={25}
                  />
                  <Text>By {this.state.jobDone} Customers.</Text>
                </View>
                <View style={{width: '100%', marginTop: 35}}>
                  <Text style={{fontSize: 30}}>
                    {this.state.jobDone} JOBS DONE
                  </Text>
                  <Text>You have completed {this.state.jobDone} Jobs.</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.shiftWrapper}>
                <TouchableOpacity
                  onPress={this.stopTracking}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#fff'}}>End Shift</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.logoutWrapper}>
                <TouchableOpacity
                  onPress={this._logOut}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#fff'}}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View />
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
    width: '100%',
  },
  nameWrapper: {
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#02584d',
    height: '16%',
    justifyContent: 'center',
  },
  IconEntStyle: {
    marginBottom: 75,
    marginLeft: 7,
    color: '#fff',
  },
  avatar: {
    width: '30%',
    height: '15%',
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    // marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '9%',
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
    marginTop: 0,
  },
  body: {
    marginTop: 65,
    //flex: 1,
    //  alignItems: 'center',
    padding: 3,
    width: '100%',
  },
  bodyContent: {
    flex: 1,
    // alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#FFF',
    //marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    // marginTop: 10,
    // textAlign: 'center',
  },
  shiftWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#439889',
    width: '50%',
    height: 45,
    borderRadius: 63,
    alignSelf: 'center',
  },
  logoutWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#439889',
    width: '40%',
    height: 45,
    borderRadius: 63,
    marginTop: '18%',
    alignSelf: 'center',
  },
});
