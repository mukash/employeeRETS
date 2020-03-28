import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const coords = [
  {
    longitude: 72.8151,
    latitude: 33.7739,
  },
];
export default class GeolocationExample extends React.Component {
  state = {
    lat: '',
    lng: '',
    token: '',
    region: {
      latitude: 33.7463,
      longitude: 72.8397,
      latitudeDelta: 0.0822,
      longitudeDelta: 0.0321,
    },
  };
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      // alert(token);
      this.setState({token: token});
      this.getData();
      this.getCoords = setInterval(this.getData, 10000);
    } catch (e) {
      console.error(error);
    }
  }
  stopRoutine = () => {
    clearInterval(this.getCoords);
    ToastAndroid.show('Tracking has been stopped.', ToastAndroid.SHORT);
    ToastAndroid.showWithGravity(
      'Tracking has been stopped.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  watchID = null;
  getData = () => {
    this.watchID = Geolocation.watchPosition(position => {
      let lng = position.coords.longitude;
      let lat = position.coords.latitude;
      this.setState({lng: lng});
      this.setState({lat: lat});
    });
    fetch('http://rets.codlers.com/api/employee/trackingemp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token,
        longitude: this.state.lng,
        latitude: this.state.lat,
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
  };

  render() {
    const {navigation} = this.props;
    const Latitude = navigation.getParam('lat');
    const Longitude = navigation.getParam('lng');
    const latEmp = this.state.lat;
    const lngEmp = this.state.lng;
    console.log(this.state.lat);
    console.log(latEmp + '' + lngEmp);
    return (
      <View accessible={true} style={styles.container}>
        <MapView style={styles.map} region={this.state.region}>
          {/* <Marker
            coordinate={{
              longitude: this.state.lng,
              latitude: this.state.lat,
            }}
            title={'hala hala'}
            description={'described'}
          /> */}
          <Marker
            coordinate={{
              longitude: parseFloat(Longitude),
              latitude: parseFloat(Latitude),
            }}
            title={'hala hala'}
            description={'described'}
          />
          {/* <MapViewDirections
            origin={coords[0]}
            destination={latlng}
            apikey={'AIzaSyBvWG7c2--G81Nw0HzVG2dzQhA6FcYTpaU'}
            strokeWidth={3}
            strokeColor="hotpink"
          /> */}
        </MapView>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.stopRoutine}>
          <Text>Stop Tracking</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fadeIn: {
    width: 250,
    height: 50,
    backgroundColor: '#bdc3c7',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 150,
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
