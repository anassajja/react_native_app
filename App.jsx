import * as React from 'react'; // Import the React library from the react package
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import ResetPasswordScreen from './components/Reset_password';
import ProfileScreen from './components/Profile';
import SettingsScreen from './components/Settings';
import DashboardScreen from './components/Dashboard';
import ModuleScreen from './components/Modules';
import CourseScreen from './components/Courses';
import FieldScreen from './components/Fields';
import DepartmentScreen from './components/Departments';
import TeacherScreen from './components/Teachers';
import StudentScreen from './components/Students';
import AbsenceScreen from './components/Absences';
import Menu from './components/Menu';


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
      <Stack.Screen name="Module" component={ModuleScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Course" component={CourseScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Field" component={FieldScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Department" component={DepartmentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Teacher" component={TeacherScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Absence" component={AbsenceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
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