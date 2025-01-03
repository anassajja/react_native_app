import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import NavBar from './NavBar';

const Menu = () => {

    const navigation = useNavigation();

    const onSwipeRight = () => {
        navigation.navigate('Profile');
    }

    const onSwipeLeft = () => {
        navigation.navigate('Login');
    };

    return (
        <GestureRecognizer onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, anass.ajja@gmail.com</Text>
                <Text style={styles.roleText}>Role: </Text>
            </View>

            <View style={styles.cardContainer}>
                <MenuCard
                icon="clipboard-list"
                title="Filière"
                description="Select a Filière"
                iconLibrary="FontAwesome5"
                />
                <MenuCard
                icon="person-remove"
                title="Absence"
                description="Manage Student Absences"
                iconLibrary="MaterialIcons"
                />
                <MenuCard
                icon="settings"
                title="Module"
                description="View or Create Modules"
                iconLibrary="MaterialIcons"
                />
                <MenuCard
                icon="domain"
                title="Department"
                description="Manage Departments"
                iconLibrary="MaterialIcons"
                />
                <MenuCard
                icon="chalkboard-teacher"
                title="Teacher"
                description="Manage Teachers"
                iconLibrary="FontAwesome5"
                />
                <MenuCard
                icon="graduation-cap"
                title="Student"
                description="Manage Students"
                iconLibrary="FontAwesome5"
                />
            </View>
            <Text style={styles.footer}>© 2024 Absence Management System. All rights reserved.</Text>
            </ScrollView>
            <NavBar />
        </GestureRecognizer>
    );
};

const MenuCard = ({ icon, title, description, iconLibrary }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {iconLibrary === "FontAwesome5" ? ( // Check if the icon library is FontAwesome5 or MaterialIcons
        <FontAwesome5 name={icon} size={40} color="#ff6464" />
      ) : (
        <MaterialIcons name={icon} size={40} color="#ff6464" />
      )}
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ff6464',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  roleText: {
    fontSize: 16,
    color: '#fff',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap the cards to the next line if they don't fit
    justifyContent: 'center',
    gap: 0,
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 50,
    textAlign: 'center',
  },
});

export default Menu;
