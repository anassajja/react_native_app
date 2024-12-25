import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();
  
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
          const response = await axios.post('http://192.168.11.107:8000/api/register', {
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
  
  /*   const onSwipeRight = () => {
      navigation.navigate('Login');
    };
  
    const onSwipeLeft = () => {
      navigation.navigate('Settings');
    } */
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
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
        <Text style={styles.text} onPress={() => navigation.navigate('Login')}>Already Have an Account?</Text>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
    text: {
        fontSize: 12,
        color: '#3338',
        marginBottom: 12,
        textAlign: 'center',
    },    
});
       
export default Register;