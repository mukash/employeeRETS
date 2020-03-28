/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Icon,
} from 'react-native';

import 'react-native-gesture-handler';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import MapScreen from './MapScreen';
import ComplainSceen from './ComplainScreen';
import ProfileScreen from './ProfileScreen';
import TestScreen from './TestScreen';
import TestScreenOther from './TestScreenOther';
const CustomDrawerComponent = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        backgroundColor: '#02584d',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 150,
          height: 200,
          borderRadius: 12,
        }}
        source={require('../assets/img.png')}
      />
    </View>
    <View style={{backgroundColor: '#f5f5f6'}}>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Profile: {screen: ProfileScreen},
    Map: {screen: MapScreen},
    Jobs: {screen: ComplainSceen},
    Test: {screen: TestScreen},
    Testt: {screen: TestScreenOther},
  },
  {
    contentComponent: CustomDrawerComponent,
  },
);

const DashboardScreen = createAppContainer(DrawerNavigator);

export default DashboardScreen;
