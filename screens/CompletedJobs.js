import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {List, ListItem} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';

class CompletedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      dataSource: [],
      message: '',
      isLoading: false,
    };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({token: token});
      //this.setState({isLoading: true});
      this.getComplains();
    } catch (e) {
      console.error(error);
    }
  }
  getComplains = () => {
    fetch('https://jhnerd.com/rets/api/employee/jobviewcom.php', {
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
        if (responseJson['Message'] != undefined) {
          let message = responseJson['Message'];
          this.setState({message: message});
          console.log(message);
        } else {
          this.setState({
            dataSource: responseJson,
            //isLoading: true,
          });
        }
        console.log(this.state.dataSource);
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  renderItem = item => (
    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
      <ListItem selected containerStyle={{borderBottomWidth: 0}}>
        <TouchableOpacity onPress={() => this.getComplainDetail(item)}>
          <Text style={{fontWeight: 'bold', padding: 7}}>Client Name: </Text>
          <Text style={{paddingLeft: 7}}>{item.name}</Text>
          <Text style={{fontWeight: 'bold', padding: 7}}>Client Address:</Text>
          <Text style={{paddingLeft: 7}}> {item.address}</Text>
          <Text style={{fontWeight: 'bold', padding: 7}}>
            Complain status:{' '}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              padding: '4%',
              color: 'white',
              backgroundColor: 'mediumseagreen',
            }}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </ListItem>
    </List>
  );

  getComplainDetail = item => {
    this.props.navigation.navigate('CompletedDetail', {
      Name: item.name,
      Address: item.address,
      Description: item.description,
      Number: item.ph_number,
      Latitide: item.latitude,
      Longitude: item.longitude,
      Date: item.dated,
      jobId: item.jid,
      ClientID: item.cid,
      Status: item.status,
    });
  };
  handleRefresh = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => this.getComplains(),
    );
  };
  render() {
    return (
      <View>
        <View>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <IconEnt name="menu" style={styles.IconEntStyle} size={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Completed Jobs</Text>
            </View>
          </View>
          {this.state.dataSource == 0 ? (
            <View opacity={0.4} style={styles.message}>
              <Text style={{fontSize: 20}}>{this.state.message}</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.dataSource}
              showsVerticalScrollIndicator={true}
              keyExtractor={item => item.jid}
              renderItem={({item}) => this.renderItem(item)}
              onRefresh={() => this.handleRefresh()}
              refreshing={this.state.isLoading}
              style={{width: '95%'}}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    //height: '18%',
    flexDirection: 'row',
    paddingBottom: '2%',
    width: '100%',
  },
  message: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: '4%',
    marginLeft: '4%',
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 23,
  },
});

export default CompletedJobs;
