import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {List, ListItem} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({token: token});
      this.getComplains();
    } catch (e) {
      console.error(error);
    }
  }
  getComplains = () => {
    fetch('http://rets.codlers.com/api/employee/jobviewemp.php', {
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
        this.setState({
          dataSource: responseJson,
        });
        //console.log(this.state.dataSource);
      })
      .catch(error => {
        console.error(error);
      });
  };
  renderItem = item => (
    <List>
      <ListItem selected>
        <TouchableOpacity onPress={() => this.getComplainDetail(item)}>
          <Text>NAME: {item.name}</Text>
          <Text>DESCRIPTION: {item.address}</Text>
          <Text>ID: {item.cid}</Text>
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
      Date: item.date,
      jobId: item.jid,
      ClientID: item.cid,
    });
    //console.log(item.jid);
  };
  render() {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <IconEnt name="menu" style={styles.IconEntStyle} size={35} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Your Jobs</Text>
          </View>
        </View>
        <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.jid}
          renderItem={({item}) => this.renderItem(item)}
        />
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
    marginTop: 24,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: 100,
    marginTop: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
  },
});
