import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    
    const navigation = useNavigation();

    const onSwipeRight = () => {
        navigation.navigate('Settings');
    }

    onSwipeLeft = () => {
        navigation.navigate('Home');
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    return (
        <GestureRecognizer
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
            config={config}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text>Swipe right to go to Settings</Text>
                <Text>Swipe left to go to Home</Text>
            </View>
        </GestureRecognizer>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;