import * as React from 'react'; // Import the React library from the react package
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import ResetPasswordScreen from './components/Reset_password';
import ProfileScreen from './components/Profile';
import SettingsScreen from './components/Settings';

const RootStack = createNativeStackNavigator({ // Create a new stack navigator called RootStack
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        headerShown: false,
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      options: {
        headerShown: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        headerShown: false,
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack); // Create a static navigation container with the RootStack navigator

export default function App() { // Export the App component as the default export
  return <Navigation />; // Return the Navigation component from the App component
}