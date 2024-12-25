import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';

const SettingsScreen = () => { // Settings screen component with navigation prop

    const [isEnabled, setIsEnabled] = useState(false); // State for the toggle switch
    const toggleSwitch = () => {
      setIsEnabled((previousState) => { // Update the state of the switch when it is toggled
          const newState = !previousState; // Toggle the switch state (true/false)
          if (newState) {
              Alert.alert('Notification', 'Notifications are enabled !');
          }
          return newState; // Return the new state
      });
    };

    const navigation = useNavigation(); // Get the navigation prop
    
    const onSwipeRight = () => {
        navigation.navigate('Login');
    }

    const onSwipeLeft = () => {
        navigation.navigate('Profile');
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

  const settingsData = [ // Data for the settings list view (title, icon, onPress function, and toggle switch)
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
      title: 'Support',
      icon: 'help-circle-outline',
      onPress: () => alert('Support'),
    },
  ];

  const renderItem = ({ item }) => ( // Render each item in the list view
    <View style={styles.itemContainer}>
        <Icon name={item.icon} size={24} color="#FF6464" style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
        {item.toggle ? ( // If the item has a toggle switch, render the switch
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#ff6464" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch} // Call the toggleSwitch function when the switch is toggled
                        value={isEnabled} // Set the value of the switch to the state
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
            renderItem={renderItem} // Render each item in the list
            keyExtractor={(item) => item.id} // Generate a unique key for each item in the list
            contentContainerStyle={styles.list} // Add padding to the list
        />
        </View>
        <NavBar />
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
    paddingTop: 20, // Add padding to the top of the list view
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center', // Center the items in the FlatList

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
