import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import ComplainDetail from './screens/ComplainDetail';
import CompletedJobsDetail from './screens/CompletedJobsDetail';
import LogoScreen from './screens/LogoScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <switchNav />;
  }
}

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
});

const switchNav = createSwitchNavigator({
  Logo: {screen: LogoScreen ,  navigationOptions: { headerShown: false, }},

  Loading: {screen: LoadingScreen},
  stack: AppNavigator,
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {headerShown: false},
  },
  Complain: {
    screen: ComplainDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
  CompletedDetail: {
    screen: CompletedJobsDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
});
export default createAppContainer(switchNav);
