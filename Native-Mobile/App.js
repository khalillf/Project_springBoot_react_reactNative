import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import LandingPage from './components/LandingPage'; 
import LoginScreen from './components/LoginScreen';
import Panier from './components/Panier';
import Profile from './components/Profile';
import Payment from './components/Payment';
import CreateUserComponent from './components/CreateUserComponent';
import HomeScreen from './components/HomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Panier" component={Panier} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateUser" component={CreateUserComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
