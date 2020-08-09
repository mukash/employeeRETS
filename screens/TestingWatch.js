import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {AnimatedRegion, Marker, Animated} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import IsLoadingCoords from './isLoadingCoords';
const LATITUDE = 33.74083037;
const LONGITUDE = 72.78583019;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0822;
const LONGITUDE_DELTA = 0.0321;
export default class GeolocationExample extends React.Component {
  state = {
    token: '',
    isLoading: true,
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    region: new AnimatedRegion({
      latitude: 33.74083037,
      longitude: 72.78583019,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  };
  onRegionChange(region) {
    this.state.region.setValue(region);
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({token: token});
      //this.getCoords = setInterval(this.fetchCoords, 500);
      this.fetchCoords(token);
      this.loadingCoords();
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
    this.watchId = Geolocation.watchPosition(
      position => {
        let lng = position.coords.longitude;
        let lat = position.coords.latitude;
        //console.log('longitude: ' + lng + ' ' + 'Latitude: ' + lat);
        this.setState({
          coordinate: {
            latitude: lat,
            longitude: lng,
          },
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 500,
        fastestInterval: 10000,
        forceRequestLocation: true,
        distanceFilter: 0,
      },
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    const duration = 500;

    if (this.props.coordinate !== nextProps.coordinate) {
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            nextProps.coordinate,
            duration,
          );
        }
      } else {
        this.state.coordinate
          .timing({
            ...nextProps.coordinate,
            duration,
          })
          .start();
      }
    }
  }
  statusChange = jobId => {
    clearInterval(this.getCoords);
    fetch('https://jhnerd.com/rets/api/employee/statusUpdate.php', {
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
    // const latEmp = this.state.lat;
    // const lngEmp = this.state.lng;
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <IsLoadingCoords />
        ) : (
          <View style={styles.container}>
            {Latitude == undefined && Longitude == undefined ? (
              <View accessible={true} style={styles.container}>
                <Animated
                  style={styles.map}
                  initialRegion={this.state.region}
                  onRegionChange={() => this.onRegionChange}>
                  <MapView.Marker.Animated
                    ref={marker => {
                      this.marker = marker;
                    }}
                    coordinate={this.state.coordinate}
                  />
                </Animated>
              </View>
            ) : (
              <View accessible={true} style={styles.container}>
                <MapView style={styles.map} region={this.state.region}>
                  {/* <Marker
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
                  </Marker> */}
                  <MapView.Marker.Animated
                    ref={marker => {
                      this.marker = marker;
                    }}
                    coordinate={this.state.coordinate}
                  />
                  <Marker
                    coordinate={{
                      longitude: parseFloat(Longitude),
                      latitude: parseFloat(Latitude),
                    }}
                    title={'Client'}
                    description={'shaka fradia'}
                  />
                  <MapViewDirections
                    origin={this.state.coordinate}
                    destination={{latitude: Latitude, longitude: Longitude}}
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
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginBottom: 0,
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
    width: '60%',
    borderRadius: 30,
    backgroundColor: '#439889',
  },
});
