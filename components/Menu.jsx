import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://192.168.11.105:8000/api/user');
            setEmail(response.data.email);
            setRole(response.data.role);
        }
        fetchUser();
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {email}</Text>
          <Text style={styles.roleText}>Role: {role}</Text>
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
        <View style={styles.footerContainer}>
        <Text style={styles.footer}>© {new Date().getFullYear()} Absence Management System. All rights reserved.</Text>
        </View>
      </SafeAreaView>
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
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'rgba(255, 100, 100, 0.8)', // Changed to rgba for transparency
    width: '100%',
    padding: 20,
    borderRadius: 25,
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
  footerContainer: {
    bottom: -20,
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent',
    padding: 10,
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Menu;
