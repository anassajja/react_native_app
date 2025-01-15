import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import attendanceImage from '../assets/attendance-management-system.png';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import the SafeAreaView component from the react-native-safe-area-context library

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const resetFields = () => {
        setLogin('');
        setPassword('');
        setRole('');
        setError('');
    };

    const handleLogin = async () => {
        if (!login || !password) { // Check if the name and password fields are empty or not
            setError('All fields are required');
            return;
        } else {
            setError('');
            try {
                const response = await axios.post('http://192.168.11.102:8000/api/login', {
                    login,
                    password,
                    role,
                });
                const token = response.data.sanctum_token;
                Cookies.set('authToken', token, { expire : 7 });
                await AsyncStorage.setItem('authToken', token); // Store the token in the local storage
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the header for all requests to the server
                console.log(response.data);
                Toast.show({
                    type: 'success',
                    text1: 'Welcome',
                    text2: `Welcome: ${response.data.user.username}`,
                });
                resetFields();
                setTimeout(() => {
                    if (role === 'teacher') {
                        navigation.navigate('Teacher');
                    } else if (role === 'student') {
                        navigation.navigate('Student');
                    } else if (role === 'admin') {
                        navigation.navigate('Dashboard');
                    }
                }, 1000);

            } catch (error) {
                setError('Invalid credentials, please try again');
                console.log(error);
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
        navigation.navigate('Dashboard');
    };

    return (
        <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{ flex: 1 }}>
            <LinearGradient colors={['#FFE5E1', '#FFB3A7', '#ff6464']} style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.selectRoleLabel}>Select Role :</Text>
                        <RadioButtonGroup
                            containerStyle={styles.radioContainer}
                            selected={role}
                            onSelected={(value) => setRole(value)}
                            radioBackground="#FF6F61"
                        >
                            <RadioButtonItem value="teacher" label=""/>
                            <Text style={{ fontWeight: 'bold' }}>Teacher</Text>
                            <RadioButtonItem value="student" label=""/>
                            <Text style={{ fontWeight: 'bold' }}>Student</Text>
                            <RadioButtonItem value="admin" label="" />
                            <Text style={{ fontWeight: 'bold' }}>Admin</Text>
                        </RadioButtonGroup>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Username or Email"
                                placeholderTextColor="#FF6F61"
                                value={login}
                                onChangeText={setLogin}
                            />
                            <MaterialIcons name="email" size={24} color="#FF6F61" style={styles.icon} />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                placeholderTextColor="#FF6F61"
                                secureTextEntry={!showPassword} // Hide the password by default
                                value={password}
                                onChangeText={setPassword}
                            />
                            <FontAwesome name="lock" size={24} color="#FF6F61" style={styles.icon} />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}> 
                                <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#FF6F61" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.errorContainer}>
                            {error ? <Text style={styles.error}>{error}</Text> : null} 
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 5 }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 20}}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.imageContainer}>
                        <Image
                            source={attendanceImage}
                            style={styles.image} 
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <Toast/>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the container with the background color
        justifyContent: 'center', // vertical alignment of the children
        alignItems: 'center', // horizontal alignment of the children
        height: '100%',
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
    },
    formContainer: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-between', // Align the children with space in between 
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginBottom: 40,
    },
    selectRoleLabel: {
        color: 'black',
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 20,
        alignSelf: 'flex-start', // Align the label to the start of the screen
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
        gap: 10,
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
        shadowColor: 'red',
        shadowRadius: 15, // Android Only
        elevation: 5, // Android Only
    },
    input: {
        flex: 1, // Take the remaining space in the container
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#ff6464',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: 'center', // horizontal alignment of the text inside the button
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontWeight: 500,
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
});

export default Login;
