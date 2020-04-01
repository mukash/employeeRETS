import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import IsLoadingCoords from './isLoadingCoords';
import IconOnMap from './iconOnMap';
export default class GeolocationExample extends React.Component {
  state = {
    token: '',
    lat: '',
    lng: '',
    isLoading: true,
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
      this.setState({token: token});
      this.loadingCoords();
      this.fetchCoords();
    } catch (e) {
      console.error(error);
    }
  }
  loadingCoords = () => {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  };

  fetchCoords = () => {
    fetch('http://rets.codlers.com/api/employee/getCoords.php', {
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
        console.log(responseJson);
        this.setState({
          lat: responseJson.latitude,
          lng: responseJson.longitude,
        });

        console.log(this.state.lat + '' + this.state.lng);
      })
      .catch(error => {
        alert(error);
      });
  };
  statusChange = jobId => {
    fetch('http://rets.codlers.com/api/employee/statusUpdate.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jid: jobId,
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
        console.error(error);
      });
    this.props.navigation.navigate('Jobs');
  };
  render() {
    const {navigation} = this.props;
    const Latitude = navigation.getParam('lat');
    const Longitude = navigation.getParam('lng');
    const jobId = navigation.getParam('jobId');
    const latEmp = this.state.lat;
    const lngEmp = this.state.lng;
    const origin = {latitude: latEmp, longitude: lngEmp};
    const destination = {latitude: Latitude, longitude: Longitude};
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <IsLoadingCoords />
        ) : (
          <View accessible={true} style={styles.container}>
            <MapView style={styles.map} region={this.state.region}>
              <Marker
                coordinate={{
                  longitude: parseFloat(lngEmp),
                  latitude: parseFloat(latEmp),
                }}
                title={'Employee'}
                description={'Wasti'}>
                <Image
                  source={require('../assets/img.png')}
                  style={{width: 45, height: 45}}
                />
              </Marker>
              <Marker
                coordinate={{
                  longitude: parseFloat(Longitude),
                  latitude: parseFloat(Latitude),
                }}
                title={'Client'}
                description={'shaka fradia'}
              />
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={'AIzaSyBvWG7c2--G81Nw0HzVG2dzQhA6FcYTpaU'}
                strokeWidth={3}
                strokeColor="#02584d"
              />
            </MapView>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.statusChange(jobId)}>
              <Text>Complete job</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#fff',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 150,
  },
  iconWrapper: {
    marginTop: 24,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#000',
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
