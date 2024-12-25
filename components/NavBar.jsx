import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

function NavBar() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" style={styles.icons} />
                <Text style={styles.title}>Home</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
                <Icon name="cog" style={styles.icons} />
                <Text style={styles.title}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                <Icon name="user" style={styles.icons} />
                <Text style={styles.title}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        justifyContent: 'space-around',// Add this line to align the items in the center
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 0,
    },
    navItem: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        color: '#FF0000',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    icons: {
        color: '#FF0000',
        fontSize: 24,
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: '#FF0000',
    },
});

export default NavBar;