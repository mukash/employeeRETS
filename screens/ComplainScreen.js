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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      firstData: '',
      dataSource: '',
      message: '',
      isLoading: false,
    };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({token: token});
      //this.setState({isLoading: true});
      this.getFirstComplain();
      this.getComplains();
    } catch (e) {
      console.error(error);
    }
  }
  getFirstComplain = () => {
    fetch('https://jhnerd.com/rets/api/employee/firstjob.php', {
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
            firstData: responseJson['first'],

            //isLoading: true,
          });
          console.log(this.state.firstData);
        }
        //console.log(this.state.dataSource);
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  getComplains = () => {
    fetch('https://jhnerd.com/rets/api/employee/jobviewemp.php', {
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
            // firstData: responseJson['first'],
            dataSource: responseJson['response'],
            //isLoading: true,
          });
          console.log(this.state.firstData);
        }
        //console.log(this.state.dataSource);
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  renderItem = item => (
    <List
      containerStyle={{
        borderTopWidth: 0,
        borderBottomWidth: 0,
      }}
      opacity={0.4}>
      <ListItem selected containerStyle={{borderBottomWidth: 0}}>
        <TouchableOpacity
          onPress={() => this.getComplainDetail(item)}
          disabled={true}>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Client Name:{' '}
          </Text>
          <Text style={{paddingLeft: 7}}>{item.name}</Text>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Client Address:
          </Text>
          <Text style={{paddingLeft: 7}}> {item.address}</Text>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Complain status:{' '}
          </Text>
          <Text
            style={{
              paddingLeft: 7,
              padding: 7,
              backgroundColor: 'red',
              width: '270%',
              color: '#fff',
            }}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </ListItem>
    </List>
  );
  renderFirstItem = item => (
    <List style={{width: '100%'}}>
      <ListItem style={{width: '100%'}}>
        <TouchableOpacity
          onPress={() => this.getComplainDetail(item)}
          style={{width: '100%'}}>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Client Name:{' '}
          </Text>
          <Text style={{padding: 7}}>{item.name}</Text>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Client Address:
          </Text>
          <Text style={{padding: 7}}> {item.address}</Text>
          <Text style={{fontWeight: 'bold', padding: 7, fontSize: 17}}>
            Complain status:{' '}
          </Text>
          <Text
            style={{
              padding: 7,
             // padding: 7,
              backgroundColor: 'red',
            
              color: '#fff',
            }}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </ListItem>
    </List>
  );
  getComplainDetail = item => {
    this.props.navigation.navigate('Complain', {
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
                <IconEnt name="menu" style={styles.IconEntStyle} size={25} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Your Jobs</Text>
            </View>
          </View>
          {this.state.dataSource == 0 ? (
            <View opacity={0.4} style={styles.message}>
              <Text style={{fontSize: 20}}>{this.state.message}</Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={this.state.firstData}
                // showsVerticalScrollIndicator={true}
                keyExtractor={item => item.jid}
                renderItem={({item}) => this.renderFirstItem(item)}
                onRefresh={() => this.handleRefresh()}
                refreshing={this.state.isLoading}
                style={{height: '22%', width: '95%'}}
              />
              <FlatList
                data={this.state.dataSource}
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item.jid}
                renderItem={({item}) => this.renderItem(item)}
                onRefresh={() => this.handleRefresh()}
                refreshing={this.state.isLoading}
                style={{ width: '95%'}}
              />
            </View>
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
