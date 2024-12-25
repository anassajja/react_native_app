import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import { SafeAreaView } from 'react-native';
import attendanceImage from '../assets/attendance-management-system.png';

const Home = () => {
    const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0 (transparent)
    const navigation = useNavigation(); // Get the navigation prop

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const onSwipeLeft = () => {
        navigation.navigate('Login');
    };

    return (
        <>
            <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
            <GestureRecognizer 
                onSwipeLeft={onSwipeLeft} 
                config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} 
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#FF6464', '#FF6347', '#FFA07A', '#FFF']} // Adjust gradient colors to your needs
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }} // Adjust gradient direction to your needs
                    end={{ x: 1, y: 1 }} // Adjust gradient direction to your needs


                >
                    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                        <View style={{ width: '100%' , position: 'absolute',top: "5%",left: "6%"}}>
                            <Text style={styles.title}>Sign In to</Text>
                            <Text style={styles.title}>Web</Text>
                            <Text style={styles.title}>Attendance</Text>
                            <Text style={styles.title}>Management</Text>
                            <Text style={styles.title}>System </Text>
                        </View>
                        <View style={{marginTop: 250}}>
                            <Image 
                                source={attendanceImage}
                                style={styles.image} 
                                resizeMode="contain" 
                                />
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.buttonText}>Go to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <NavBar />
                </LinearGradient>
                </SafeAreaView>
            </GestureRecognizer>
        </>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 400, // Adjust to your needs
        height: 400, // Adjust to your needs
        marginBottom: 0,
        marginHorizontal: 'auto'
    },
    title: {
        width: '100%',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'left',
        fontFamily: 'Oswald-Bold',
    },
    button: {
        backgroundColor: '#ff6464',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginHorizontal: 'auto',
        bottom: 0,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Home;
