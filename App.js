import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import Productexperience from './screens/Productexperience';
import abcd from './screens/abcd';
import screendetailed from './screens/screendetailed';


const CleverTap = require('clevertap-react-native');

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    CleverTap.setDebugLevel(2);
    console.log("hello everyone")

  
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Productexperience" component={Productexperience} />
          <Stack.Screen name="abcd" component={abcd} />

          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Buy Now" component={screendetailed} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}