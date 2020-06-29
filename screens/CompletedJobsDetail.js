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
                size={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Job Detail</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', padding: 7}}>Client Name: </Text>
        <Text style={{paddingLeft: 7}}>{Name}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Client Number:</Text>
        <Text style={{paddingLeft: 7}}> {address}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Description: </Text>
        <Text style={{paddingLeft: 7}}>{Description}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>
          Complain Registration Date:
        </Text>
        <Text style={{paddingLeft: 7}}> {Date}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Complain status: </Text>
        <Text
          style={{
            paddingLeft: 7,
            padding: 7,
            backgroundColor: 'mediumseagreen',
            fontSize: 30,
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

export default CompletedJobsDetail;
