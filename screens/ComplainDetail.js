import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';

class ComplainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.navigation.navigate('Jobs');
  };
  startJob = (Latitide, Longitude, jobId, ClientID) => {
    //alert(Latitide + '  and  ' + Longitude);
    this.props.navigation.navigate('Map', {
      lat: Latitide,
      lng: Longitude,
      jobId: jobId,
      ClientID: ClientID,
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
                name="arrow-long-left"
                style={styles.IconEntStyle}
                size={25}
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
            onPress={() => this.startJob(Latitide, Longitude, jobId, ClientID)}>
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
    marginHorizontal: 105,
    marginTop: 25,
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
