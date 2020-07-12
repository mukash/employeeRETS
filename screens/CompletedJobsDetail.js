import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
class CompletedJobsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.navigation.navigate('Completed');
  };

  render() {
    const {navigation} = this.props;
    const Name = navigation.getParam('Name');
    const address = navigation.getParam('Address');
    let status = navigation.getParam('Status');
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
                size={26}
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
            fontWeight: "bold",fontSize: 24, textAlign:"center" ,padding: '5%',color:"white", backgroundColor: 'mediumseagreen',
          }}>
          {status}
        </Text>
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
    paddingTop:'-3%'
  },
  iconWrapper: {
    marginTop: '4%',
    marginLeft: '2%',
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal:'25%',
    marginTop: '3%',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
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

export default CompletedJobsDetail;
