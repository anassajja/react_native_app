import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import attendanceImage from '../assets/attendance-management-system.png';
import { Dropdown } from 'react-native-element-dropdown';

const Register = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const resetFields = () => {
        setUsername('');
        setPassword('');
        setPassword_confirmation('');
        setEmail('');
        setRole('');
        setError('');
    };

    const handleLogin = async () => {
        if (!username || !password || !password_confirmation || !email || !role) {
            setError('All fields are required');
            return;
        } else if (password !== password_confirmation) {
            setError("Passwords do not match");
            return;
        } else {
            setError('');
            try {
                const response = await axios.post('http://192.168.11.102:8000/api/register', {
                    role,
                    username,
                    email,
                    password,
                    password_confirmation,
                });
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
                }, 1000); // 1 second delay
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    setError(error.response.data.message || 'Validation error, please check your input');
                } else {
                    setError('Invalid credentials, please try again');
                }
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.response?.data?.message || 'Invalid credentials',
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
            <LinearGradient colors={['#FFE5E1', '#FFB3A7', '#ff6464']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Register</Text>
                        <View style={styles.dropdownContainer}>
                            {/* <Text style={styles.dropdownLabel}>Select Your Role</Text> */}
                            <Dropdown
                                data={[
                                    { label: 'Teacher', value: 'teacher' },
                                    { label: 'Student', value: 'student' },
                                    { label: 'Admin', value: 'admin' }
                                ]}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Role"
                                value={role}
                                onChange={item => setRole(item.value)}
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownInnerContainer}
                                renderLeftIcon={() => (
                                    <MaterialIcons name="person" size={24} color="#FF6F61" style={styles.dropdownIcon} />
                                )}
                            />
                        </View>
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Username"
                                    placeholderTextColor="#FF6F61"
                                    value={username}
                                    onChangeText={setUsername}
                                />
                                <MaterialIcons name="person" size={24} color="#FF6F61" style={styles.icon} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                    placeholderTextColor="#FF6F61"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <MaterialIcons name="email" size={24} color="#FF6F61" style={styles.icon} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Password"
                                    placeholderTextColor="#FF6F61"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <FontAwesome name="lock" size={24} color="#FF6F61" style={styles.icon} />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#FF6F61" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Password Confirmation"
                                    placeholderTextColor="#FF6F61"
                                    secureTextEntry={!showPassword}
                                    value={password_confirmation}
                                    onChangeText={setPassword_confirmation}
                                />
                                <FontAwesome name="lock" size={24} color="#FF6F61" style={styles.icon} />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#FF6F61" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Already have an account? Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image
                            source={attendanceImage}
                            style={styles.image} 
                        />
                    </View>
                </ScrollView>
            </LinearGradient>
            <Toast />
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingRight: 20,
        paddingLeft: 20,
    },
    scrollContainer: {
        flexGrow: 1, // Take the whole screen height
        justifyContent: 'center',
        alignItems: 'center',
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE5E1',
        color: '#FF6F61', // Text color 
        fontWeight: 'bold',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: '100%',
        shadowColor: 'red',
        shadowRadius: 15, // Shadow radius 
        elevation: 5,
    },
    input: {
        flex: 1,
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
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
        fontWeight: 500,
        fontSize: 16,
        textAlign: 'center', // Center the error text
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center', // Center the image horizontally
        justifyContent: 'center', // Center the image vertically
    },
    image: {
        width: 300, // Adjust the width as needed
        height: 300, // Adjust the height as needed
        resizeMode: 'contain', // Maintain aspect ratio
    },    
    dropdownContainer: {
        width: '100%',
        marginBottom: 20,
    },
    dropdownLabel: {
        color: '#FF6F61',
        fontSize: 16,
        marginBottom: 5,
    },
    dropdown: {
        backgroundColor: '#FFE5E1',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'red',
        elevation: 5,
    },
    dropdownIcon: {
        marginRight: 10,
    },
    placeholderStyle: {
        color: '#FF6F61',
    },
    selectedTextStyle: {
        color: '#FF6F61',
    },
    dropdownInnerContainer: {
        borderRadius: 15,
    },
});

export default Register;