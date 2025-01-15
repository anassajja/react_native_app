import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, VirtualizedList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs'; // Import dayjs library for date formatting
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar from './NavBar';
import profileImage from '../assets/profile.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Cookies from 'js-cookie';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker

const Profile = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(dayjs());
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [opengender, setOpengender] = useState(false);
    const [valuegender, setValuegender] = useState(null); // Initialize the value state variable with null value
    const [itemsgender, setItemsgender] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'},
    ]);
    const [openrole, setOpenrole] = useState(false);
    const [valuerole, setValuerole] = useState(null);
    const [itemsrole, setItemsrole] = useState([
        {label: 'Admin', value: 'admin'},
        {label: 'Student', value: 'student'},
        {label: 'Teacher', value: 'teacher'},
    ]);
    const [profilePic, setProfilePic] = useState(profileImage); // State for profile picture
    const navigation = useNavigation();

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setProfilePic(source);
            }
        });
    };

    useEffect(() => {
        const updateUserProfile = async () => {
            try {
                const tokenLocalStorage = await AsyncStorage.getItem('authToken');
                const tokenCookie = Cookies.get('authToken');
                token = tokenLocalStorage || tokenCookie; // Set the token to the value of the local storage token or cookie token
                if (token) {
                    const response = await axios.post('http://192.168.11.102:8000/api/user/profile', {
                        username,
                        firstName,
                        lastName,
                        email,
                        birthDate: birthDate.format('YYYY-MM-DD'), // Format the birth date using dayjs
                        gender: valuegender,
                        role: valuerole,
                        password,
                        confirmPassword: password_confirmation,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Profile updated successfully!',
                    });
                    console.log('Profile updated successfully:', response.data);
                }
                } catch (error) {
                    console.log('Error updating profile:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Error updating profile: ' + error.message,
                    });
                }
            };
            
            if (username && firstName && lastName && email && birthDate && role) { // Check if the user details are not empty
                updateUserProfile();
            }
        }, [firstName, lastName, birthDate, phone_number]); // Add the user details to the dependency array to trigger the effect when the user details change

    const handleSubmit = async () => {
        if (!username.trim()) { // Check if the name field is empty or not (trim removes leading and trailing whitespace)
            alert('Username is required.');
            return;
        }
        if (!email.includes('@')) { // Check if the email field is empty or not (includes checks if the string contains the specified character)
            alert('Enter a valid email address.');
            return;
        }
        
        if (password !== password_confirmation) { // Check if the password and confirm password fields match or not
            alert('Passwords do not match.');
            return;
        }
        console.log('Username:', username);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Phone Number:', phone_number);
        console.log('Password:', password);
        console.log('Confirm Password:', password_confirmation);
        console.log('Email:', email);
        console.log('Birth Date:', birthDate.format('YYYY-MM-DD')); // Format the birth date using dayjs
        console.log('Gender:', valuegender);
        console.log('Role:', valuerole);
        console.log('Profile updated successfully!');
    };

    const getItem = (data, index) => data[index]; // Get the item at the specified index in the data array

    const getItemCount = (data) => data.length; // Get the number of items in the data array

    const renderForm = () => ( // Render the form with input fields and a submit button
        <View style={styles.form}>
            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Username <Icon name="user" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="john_doe" value={username} onChangeText={setUsername} />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>First Name <Icon name="user" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="John" value={firstName} onChangeText={setFirstName} />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Last Name <Icon name="user" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="Doe" value={lastName} onChangeText={setLastName} />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Phone Number <Icon name="phone" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="+212 xxxxxxxxx" value={phone_number} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Email <Icon name="envelope" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="john.doe@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Role <Icon name="user" size={20} color="#FF6464" /></Text>
                <DropDownPicker
                    open={openrole}
                    value={valuerole}
                    items={itemsrole}
                    setOpen={setOpenrole}
                    setValue={setValuerole}
                    setItems={setItemsrole}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Gender <MaterialCommunityIcons name="gender-male-female" size={20} color="#FF6464"/></Text>
                <DropDownPicker
                    open={opengender}
                    value={valuegender}
                    items={itemsgender}
                    setOpen={setOpengender} // Set the open state of the dropdown to the specified value (true or false)
                    setValue={setValuegender}
                    setItems={setItemsgender}
                    style={[styles.dropdown, { minHeight: 50 }]} // Set the minimum height of the dropdown
                    textStyle={[styles.dropdownText, { fontSize: 14 }]} // Set the font size of the dropdown text
                />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Password <Icon name="lock" size={20} color="#FF6464" /></Text>   
                <TextInput style={styles.input} placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Confirm Password <Icon name="lock" size={20} color="#FF6464" /></Text>
                <TextInput style={styles.input} placeholder="Confirm Password" value={password_confirmation} onChangeText={setPasswordConfirmation} secureTextEntry={true} />
            </View>

            <View style={[styles.formField, { marginBottom: 5 }]}>
                <Text style={styles.label}>Birth Date <Icon name="calendar" size={20} color="#FF6464" /></Text>
                <DateTimePicker
                    mode="single" // Set the date picker mode to 'single' for a single date selection
                    date={birthDate}
                    onChange={(params) => setBirthDate(params.date)}
                    textColor="#333333" // Example of a specific style prop if supported
                />
            </View>
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
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')} >
                            <Icon name="arrow-left" size={20} color="#FFFFFF"/>
                        </TouchableOpacity>
                    </View>

                    {/* Profile Picture Section */}
                    <View style={styles.profilePictureContainer}>
                        <View style={styles.profilePicture}>
                            <Image
                                source={profilePic}
                                style={styles.profileImage}
                            />
                        </View>
                        <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
                            <Icon name="edit" size={16} color="whitesmoke"/>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            ListFooterComponent={() => ( 
                <>
                    {/* Action Buttons */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save  <Icon name="save" size={20} color="#FFFF" /></Text>
                    </TouchableOpacity>
                </>
            )}
        />
        <NavBar />
        <Toast/> 
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
        flexDirection: 'column',
        flex: 10,
        marginBottom: 0,
    },
    formField: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
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
        marginBottom: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        // fontVariant: ['small-caps'],
    },
});

export default Profile;