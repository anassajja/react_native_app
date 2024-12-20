import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Settings from './components/Settings';

const Tab = createBottomTabNavigator();

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);   // Initial value for opacity: 0 (transparent)

  useEffect(() => {
    Animated.timing(fadeAnim, { // Starts the animation for the fadeAnim value
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container1, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const resetFields = () => {
    setName('');
    setPassword('');
    setError('');
  };

  const handleLogin = async () => {
    if (!name || !password) {
      setError('All fields are required');
      return;
    } else {
      setError('');
      try {
        const response = await axios.post('http://192.168.11.106:8000/api/login', {
          name,
          password,
        });
        Toast.show({
          type: 'success',
          text1: 'Welcome',
          text2: `Welcome: ${response.data.user.name}`,
        });
        console.log(response.data);
        resetFields();
      } catch (error) {
        setError('Invalid credentials');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid credentials',
        });
        resetFields();
      }
    }
  };

  return (
    <View style={styles.container2}>
      <Image source={require('./assets/profile.jpg')} style={styles.profile} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.text} onPress={() => navigation.navigate('Register')}>Don't Have an Account?</Text>
    </View>
  );
};

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const resetFields = () => {
    setName('');
    setPassword('');
    setPassword_confirmation('');
    setEmail('');
  };

  const handleRegister = async () => {
    if (!name || !password || !password_confirmation || !email) {
      setError('All fields are required');
      return;
    } else if (password !== password_confirmation) {
      setError('Passwords do not match');
      return;
    } else {
      setError('');
      try {
        const response = await axios.post('http://192.168.11.106:8000/api/register', {
          name,
          password,
          password_confirmation,
          email,
        });
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'You have successfully registered!',
        });
        console.log(response.data);
        resetFields();
      } catch (error) {
        setError('Invalid credentials');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid credentials',
        });
        resetFields();
      }
    }
  };

  return (
    <View style={styles.container2}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={password_confirmation}
        onChangeText={setPassword_confirmation}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Welcome"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Welcome') {
                iconName = 'home-outline';
              } else if (route.name === 'Login') {
                iconName = 'log-in-outline';
              } else if (route.name === 'Register') {
                iconName = 'person-add-outline';
              } else if (route.name === 'Settings') {
                iconName = 'settings-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007BFF', // Customize the color of the active tab icon
            tabBarInactiveTintColor: 'gray', // Customize the color of the inactive tab icon
            tabBarStyle: {
              backgroundColor: '#00ffff',
              borderTopWidth: 0,
              elevation: 5,
              height: 60,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIconStyle: {
              size: 24, // Customize the size of the icons
              color : 'red',
            },
          })}
        >
          <Tab.Screen name="Welcome" component={WelcomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Register" component={RegisterScreen} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'whitesmoke',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 12,
    color: '#3338',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default App;