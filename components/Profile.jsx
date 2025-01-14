import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, VirtualizedList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs'; // Import dayjs library for date formatting
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar from './NavBar';
import profileImage from '../assets/profile.jpg';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(dayjs());
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'},
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: 'Admin', value: 'admin'},
        {label: 'Student', value: 'student'},
        {label: 'Teacher', value: 'teacher'},
    ]);

    const handleSubmit = async () => {
        if (!name.trim()) { // Check if the name field is empty or not (trim removes leading and trailing whitespace)
            alert('Name is required.');
            return;
        }
        if (!email.includes('@')) { // Check if the email field is empty or not (includes checks if the string contains the specified character)
            alert('Enter a valid email address.');
            return;
        }
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Birth Date:', birthDate.format('YYYY-MM-DD')); // Format the birth date using dayjs
        console.log('Gender:', value1);
        console.log('Role:', value2);
        console.log('Profile updated successfully!');
    };

    const navigation = useNavigation();

    const getItem = (data, index) => data[index]; // Get the item at the specified index in the data array

    const getItemCount = (data) => data.length; // Get the number of items in the data array

    const renderForm = () => ( // Render the form with input fields and a submit button
        <View style={styles.form}>
            <Text style={styles.label}>Name <Icon name="user" size={20} color="#FF6464" /></Text>
            <TextInput style={styles.input} placeholder="Aaron G" value={name} onChangeText={setName} />

            <Text style={styles.label}>Email <Icon name="envelope" size={20} color="#FF6464" /></Text>
            <TextInput style={styles.input} placeholder="aarong@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.label}>Role <Icon name="user" size={20} color="#FF6464" /></Text>
            <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
            />

            <Text style={styles.label}>Birth Date <Icon name="calendar" size={20} color="#FF6464" /></Text>
            
            <DateTimePicker
                mode="single" // Set the date picker mode to 'single' for a single date selection
                date={birthDate}
                onChange={(params) => setBirthDate(params.date)}
                textColor="#333333" // Example of a specific style prop if supported
            />

            <Text style={styles.label}>Gender <MaterialCommunityIcons name="gender-male-female" size={20} color="#FF6464"/></Text>
            <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1} // Set the open state of the dropdown to the specified value (true or false)
                setValue={setValue1}
                setItems={setItems1}
                style={[styles.dropdown, { minHeight: 50 }]} // Set the minimum height of the dropdown
                textStyle={[styles.dropdownText, { fontSize: 14 }]} // Set the font size of the dropdown text
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save  <Icon name="save" size={20} color="#FFFF" /></Text>
            </TouchableOpacity>
        </View>
    );

    return (
      <View style={styles.container}>
        <VirtualizedList // Render a virtualized list of forms
            data={[{ key: 'form' }]} // Data for the virtualized list (a single form)
            initialNumToRender={4} // Number of items to render initially
            renderItem={renderForm} // Render the form
            keyExtractor={(item) => item.key} // Extract the key from the item
            getItem={getItem} // Get the item at the specified index
            getItemCount={getItemCount} // Get the number of items in the data array
            showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator
            showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
            ListHeaderComponent={() => ( // Header component for the virtualized list
                <>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton}>
                            <Icon name="arrow-left" size={20} color="#FFFFFF" onPress={() => navigation.navigate('Login')} />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Picture Section */}
                    <View style={styles.profilePictureContainer}>
                        <View style={styles.profilePicture}>
                            <Image
                                source={profileImage}
                                style={styles.profileImage}
                            />
                        </View>
                        <TouchableOpacity style={styles.editIcon}>
                            {/* <Text style={styles.editIconText}>✏️</Text> */}
                            <Icon name="edit" size={16} color="whitesmoke"/>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <>
                    {/* Action Buttons */}
                    <TouchableOpacity style={styles.changePasswordButton}>
                        <Text style={styles.changePasswordText}>Change Password  <Icon name="lock" size={20} color="#FFFFFF" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout  <Icon name="sign-out" size={20} color="#FFFFFF" /></Text> 
                    </TouchableOpacity>
                </>
            )}
        />
        <NavBar />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FF6464',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FF6464',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 110,
        backgroundColor: '#FF6464',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        borderRadius: 15,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        justifyContent: 'center',
        dropdownDirection: 'BOTTOM',
    },
    dropdownText: {
        color: '#888888',
        fontSize: 16,
        fontStyle: 'italic',
        backgroundColor: '#FFFFFF',
    },
    changePasswordButton: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    changePasswordText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF6464',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        bottom: 10,
        height: 'auto',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF6464',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        // fontVariant: ['small-caps'],
    },
});

export default Profile;