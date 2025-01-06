import * as React from 'react'; // Import the React library from the react package
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import ResetPasswordScreen from './components/Reset_password';
import ProfileScreen from './components/Profile';
import SettingsScreen from './components/Settings';
import MenuScreen from './components/Menu';
import DashboardScreen from './components/Dashboard';

const Stack = createNativeStackNavigator(); // Create a new stack navigator called Stack

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() { // Export the App component as the default export
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  ); // Return the Navigation component from the App component
}