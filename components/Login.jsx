import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [current, setCurrent] = useState("teacher");
    const navigation = useNavigation();

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
        navigation.navigate('Home');
    };

    const onSwipeLeft = () => {
        navigation.navigate('Profile');
    };

    return (
        <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{ flex: 1 }}>
            <LinearGradient colors={['#FFE5E1', '#FFB3A7', 'red']} style={styles.container}>
                <Text style={styles.title}>Select Your Role</Text>
                <RadioButtonGroup
                    containerStyle={styles.radioContainer}
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground="#FF6F61"
                >
                    <RadioButtonItem value="teacher" label=""/>
                    <Text style={{ fontWeight: 'bold' , marginLeft: -20}}>Teacher</Text>
                    <RadioButtonItem value="student" label=""/>
                    <Text style={{ fontWeight: 'bold' , marginLeft: -20}}>Student</Text>
                    <RadioButtonItem value="admin" label="" />
                    <Text style={{ fontWeight: 'bold' , marginLeft: -20}}>Admin</Text>
                </RadioButtonGroup>
                <View style={{ marginTop: -150 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Username"
                            placeholderTextColor="#FF6F61"
                            value={name}
                            onChangeText={setName}
                        />
                        <MaterialIcons name="email" size={24} color="#FF6F61" style={styles.icon} />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        placeholderTextColor="#FF6F61"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <FontAwesome name="lock" size={24} color="#FF6F61" style={styles.icon} />
                </View>
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', bottom: 280 }} onPress={() => navigation.navigate('ResetPassword')}>Forgot password?</Text> 
                <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', bottom: 260 }} onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
                <Image
                    source={require('../assets/attendance-management-system.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </LinearGradient>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        position: 'absolute',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 200,
        alignSelf: 'flex-start',
        top: 50,
        marginHorizontal: 20,
    },
    radioContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        top: 125,
        marginHorizontal: 20,
        gap: 20,
    },
    radioLabel: {
        fontSize: 60,
        color: 'black',
        marginHorizontal: 10,


    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE5E1',
        color: '#FF6F61',
        fontWeight: 'bold',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
        // boxShadow: '5 10px 20px rgba(43, 255, 0, 0.1)',
        // ios
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // android (Android +5.0)
        elevation: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#FF6F61',
    },
    icon: {
        marginRight: 10,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 310,
        width: '100%',

    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    image: {
        position: 'absolute',
        width: 350,
        height: 350,
        bottom: -90,
    },
});

export default Login;
