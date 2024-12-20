import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ToastAndroid, Button, StatusBar, Text, Image, TextInput, TouchableOpacity, StyleSheet, Animated, ImageBackground} from 'react-native';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import GestureRecognizer from 'react-native-swipe-gestures';

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

  const onSwipeLeft = () => {
    navigation.navigate('Login');
  };

  return (
    <GestureRecognizer onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{flex: 1}}> 
      <ImageBackground source={require('./assets/background.png')} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View style={[styles.container1, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Welcome</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </GestureRecognizer>
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

  const onSwipeRight = () => {
    navigation.navigate('Welcome');
  };

  const onSwipeLeft = () => {
    navigation.navigate('Register');
  };

  return (
    <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{flex: 1}}>
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
        <Text style={styles.text} onPress={() => navigation.navigate('ResetPassword')}>Forgot Password?</Text>
        <Text style={styles.text} onPress={() => navigation.navigate('Register')}>Don't Have an Account?</Text>
      </View>
    </GestureRecognizer>
  );
};

const RegisterScreen = ({navigation}) => {
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

  const onSwipeRight = () => {
    navigation.navigate('Login');
  };

  const onSwipeLeft = () => {
    navigation.navigate('Settings');
  }

  return (
    <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{flex: 1}}>
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
    </GestureRecognizer>
  );
};

const ResetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const resetFields = () => {
    setEmail('');
    setError('');
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError('Email is required');
      return;
    } else {
      setError('');
      try {
        const response = await axios.post('',
          {
            email,
          }
        );
        Toast.show({
          type: 'success',
          text1: 'Reset Password',
          text2: 'Password reset instructions have been sent to your email',
        });
        console.log(response.data);
        resetFields();
      }
      catch (error) {
        setError('Invalid email');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid email',
        });
        resetFields();
      }
    }
  };

  const onSwipeRight = () => {
    navigation.navigate('Login');
  };

  return (
    <GestureRecognizer onSwipeRight={onSwipeRight} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{flex: 1}}>
      <View style={styles.container2}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </GestureRecognizer>
  );
};

const SettingsScreen = ({navigation}) => {
  
  const onSwipeRight = () => {
    navigation.navigate('Register');
  };

  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <GestureRecognizer onSwipeRight={onSwipeRight} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{flex: 1}}>
      <SafeAreaView style={styles.container3}>
        <Button title="Toggle Toast" onPress={() => showToast()} />
        <Button
          title="Toggle Toast With Gravity"
          onPress={() => showToastWithGravity()}
        />
        <Button
          title="Toggle Toast With Gravity & Offset"
          onPress={() => showToastWithGravityAndOffset()}
        />
      </SafeAreaView>
    </GestureRecognizer>
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
              } else if (route.name === 'ResetPassword') {
                iconName = 'key-outline';
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
            headerShown: false, // Hide the header of the screen
/*             headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: '#007BFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, */
              
          })}
        >
          <Tab.Screen name="Welcome" component={WelcomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Register" component={RegisterScreen} />
          <Tab.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
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
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'whitesmoke',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'whitesmoke',
    padding: 8,
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