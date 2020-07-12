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
    let status = navigation.getParam('Status');
    let Longitude = navigation.getParam('Longitude');
    let Description = navigation.getParam('Description');
    let Date = navigation.getParam('Date');
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <IconEnt
                name="chevron-small-left"
                style={styles.IconEntStyle}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Job Detail</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', padding: '5%'}}>Client Name: </Text>
        <Text style={{paddingLeft: '5%'}}>{Name}</Text>
        <Text style={{fontWeight: 'bold', padding: '5%'}}>Client Number:</Text>
        <Text style={{paddingLeft: '5%'}}> {address}</Text>
        <Text style={{fontWeight: 'bold', padding: '5%'}}>Description: </Text>
        <Text style={{paddingLeft: '5%'}}>{Description}</Text>
        <Text style={{fontWeight: 'bold', padding: '5%'}}>
          Complain Registration Date:
        </Text>
        <Text style={{paddingLeft: '5%'}}> {Date}</Text>
        <Text style={{fontWeight: 'bold', padding: '5%'}}>Complain status: </Text>
        <Text
          style={{
            fontWeight: "bold",fontSize: 24, textAlign:"center" ,padding: '5%',color:"white", backgroundColor: "red" }}>
          {status}
        </Text>
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
    //height: 95,
    flexDirection: 'row',
    paddingBottom:'2%',
    paddingTop:'-2%'

  },
  iconWrapper: {
    marginTop: '5%',
    marginLeft: '1%',
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: '25%',
    marginTop: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
  },
  buttonWrapper: {
    marginTop: '5%',
    marginHorizontal: '28%',
  },
  button: {
    width: 200,
    backgroundColor: '#439889',
    borderRadius: 25,
    marginVertical: '20%',
    paddingVertical: '8%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    
  },
});

export default ComplainDetail;
