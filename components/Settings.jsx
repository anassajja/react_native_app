import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from 'js-cookie';

const SettingsScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const navigation = useNavigation();

    const toggleSwitch = () => {
        setIsEnabled((previousState) => {
            const newState = !previousState;
            if (newState) {
                Alert.alert('Notification', 'Notifications are enabled !');
            }
            return newState;
        });
    };

    const handleLogout = async () => {
        const tokenLocalStorage = await AsyncStorage.getItem('authToken');
        const tokenCookie = Cookies.get('authToken');
        const token = tokenLocalStorage || tokenCookie;
        if (token) {
            try {
                await axios.post('http://192.168.11.104:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // Clear the token from storage
                await AsyncStorage.removeItem('authToken');
                Cookies.remove('authToken');
                console.log('Logged out successfully');
                Toast.show({
                    type: 'success',
                    text1: 'Logout',
                    text2: 'You have logged out successfully!',
                });
                navigation.navigate('Home');
            } catch (error) {
                console.log('Error logging out:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Logout Error',
                    text2: 'Failed to log out. Please try again.',
                });
            }
        }
    };

    const onSwipeRight = () => {
        navigation.navigate('Login');
    };

    const onSwipeLeft = () => {
        navigation.navigate('Profile');
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const settingsData = [
        {
            id: '1',
            title: 'Account Settings',
            icon: 'person-circle-outline',
            onPress: () => alert('Account Settings'),
        },
        {
            id: '2',
            title: 'Preferences',
            icon: 'options-outline',
            onPress: () => alert('Preferences'),
        },
        {
            id: '3',
            title: 'Notifications',
            icon: 'notifications-outline',
            toggle: true,
        },
        {
            id: '4',
            title: 'Privacy',
            icon: 'lock-closed-outline',
            onPress: () => alert('Privacy Settings'),
        },
        {
            id: '5',
            title: 'About',
            icon: 'information-circle-outline',
            onPress: () => alert('About'),
        },
        {
            id: '6',
            title: 'Logout',
            icon: 'log-out-outline',
            onPress: handleLogout,
        },
        {
            id: '7',
            title: 'Support',
            icon: 'help-circle-outline',
            onPress: () => alert('Support'),
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Icon name={item.icon} size={24} color="#FF6464" style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            {item.toggle ? (
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#ff6464" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            ) : (
                <TouchableOpacity onPress={item.onPress} style={styles.arrowButton}>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <GestureRecognizer
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            config={config}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>
                <FlatList
                    data={settingsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            </View>
            <NavBar />
            <Toast />
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    list: {
        paddingTop: 20,
        paddingHorizontal: 5,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 15,
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    arrowButton: {
        padding: 5,
    },
});

export default SettingsScreen;