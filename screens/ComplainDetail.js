import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';

class ComplainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.navigation.navigate('Jobs');
  };
  startJob = (Latitide, Longitude, jobId) => {
    //alert(Latitide + '  and  ' + Longitude);
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
    this.props.navigation.navigate('Map', {
      lat: Latitide,
      lng: Longitude,
      jobId: jobId,
    });
  };

  render() {
    const {navigation} = this.props;
    const Name = navigation.getParam('Name');
    const address = navigation.getParam('Address');
    let jobId = navigation.getParam('jobId');
    let Latitide = navigation.getParam('Latitide');
    let ClientID = navigation.getParam('ClientId');
    let Longitude = navigation.getParam('Longitude');
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <IconEnt
                name="chevron-small-left"
                style={styles.IconEntStyle}
                size={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Job Detail</Text>
          </View>
        </View>
        <Text style={{marginTop: 16}}>Id: {jobId}</Text>
        <Text style={{marginTop: 16}}>Name: {JSON.stringify(Name)}</Text>
        <Text style={{marginTop: 16}}>Address: {JSON.stringify(address)}</Text>
        <Text style={{marginTop: 16}}>Latitide: {Latitide}</Text>
        <Text style={{marginTop: 16}}>Longitude: {Longitude}</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.startJob(Latitide, Longitude, jobId)}>
            <Text style={styles.buttonText}>Do this job</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    height: 95,
    flexDirection: 'row',
  },
  iconWrapper: {
    marginTop: 26,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: 100,
    marginTop: 28,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
  },
  buttonWrapper: {
    marginTop: 10,
    marginHorizontal: 100,
  },
  button: {
    width: 200,
    backgroundColor: '#439889',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});

export default ComplainDetail;
