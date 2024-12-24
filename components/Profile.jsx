import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';



const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(Platform.OS === 'ios' || Platform.OS === 'android'); // Show date picker on iOS only 
        setBirthDate(currentDate);
    }

    const handleSubmit = async() => {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Birth Date:', birthDate);
        console.log('Gender:', gender);
    };

    const  navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
                <Icon name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
            <Image
                source={require('../assets/profile.jpg')}
                style={styles.profileImage}
            />
            </View>
            <TouchableOpacity style={styles.editIcon}>
            {/* <Text style={styles.editIconText}>✏️</Text> */}
                <Icon name="edit" size={16} color="#FFFFFF" />
            </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <Icon name="user" size={20} color="#000000" />
            <TextInput style={styles.input} placeholder="Aaron G" value={name} onChangeText={setName} />

            <Text style={styles.label}>Email</Text>
            <Icon name="envelope" size={20} color="#000000" />
            <TextInput style={styles.input} placeholder="aarong@gmail.com"  value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.label}>Birth Date</Text>
            <Icon name="calendar" size={20} color="#000000" />
            <TouchableOpacity style={styles.dataPickerButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>{birthDate.toString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                value={new Date()} // Current date
                mode="date"
                display="default"
                onChange={onChange}
                />
            )}
            
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Select Gender </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.changePasswordButton}>
            <Text style={styles.changePasswordText}>Change Password</Text>
            <Icon name="lock" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
            <Icon name="sign-out" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
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
        backgroundColor: '#E0E0E0',
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
        backgroundColor: '#000000',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIconText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        justifyContent: 'center',
    },
    dropdownText: {
        color: '#888888',
    },
    changePasswordButton: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    changePasswordText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#FF6464',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FF6464',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    datePickerText: {
        color: '#888888',
    },
    dataPickerButton: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
    },

});

export default Profile;