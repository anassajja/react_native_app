import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; // Add this line to import the useNavigation hook from @react-navigation/native


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation(); // Add this line to get the navigation prop
  
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
  
    return (
      <View style={styles.container}>
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
        <Text style={styles.text}>Remember your password? <Text style={{ color: '#ff6464' }} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
      </View>
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
        backgroundColor: '#ff6464',
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

export default ResetPassword;