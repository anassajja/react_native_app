import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import SettingsScreen from "./Settings";
import ProfileScreen from "./Profile";
import { Divider } from "react-native-paper";
import HomeScreen from "./Home";
import AbsencesScreen from "./Absences";
import StudentsScreen from "./Students";
import TeachersScreen from "./Teachers";
import CoursesScreen from "./Courses";
import ModulesScreen from "./Modules";
import DepartmentsScreen from "./Departments";
import FieldsScreen from "./Fields";
import MenuView from "./Menu";


const DashboardScreen = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const today = new Date();
        const dateString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        setCurrentDate(dateString);

        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer); // Cleanup function to clear the interval when the component unmounts or changes
        }

    }, []);

    const formatDateWithSuffix = (date) => {
        const day = date.getDate(); // Get the day of the month (1-31)
        const suffix = ["th", "st", "nd", "rd"]; // Suffixes for 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
        const v = day % 100; // Get the last two digits of the day
        const daySuffix = (suffix[(v - 20) % 10] || suffix[v] || suffix[0]); // Return the day with the correct suffix (st, nd, rd, th) 
        return { day, daySuffix}; // Return the day and the suffix as an object
    };

    return (
        <LinearGradient colors={["#ffe6e6", "#ffcccc"]} style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Dashboard</Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={30} color="#000" style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>

                {/* Time & Date Section */}
                <View style={styles.timeDateContainer}>
                    <View style={styles.iconTimeContainer}>
                        <Ionicons name="sunny" size={60} color="#F39C12" style={styles.icon} />
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{currentTime}</Text>
                            {/* <Text style={styles.amPmText}>{new Date().toLocaleTimeString('en-US', { hour12: true }).split(' ')[1]}</Text>  */}
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Realtime Insight</Text>
                    <Text style={styles.todayText}>Today:</Text>
                    <Text style={styles.dateText}>
                        {formatDateWithSuffix(new Date()).day}
                        <Text style={styles.dateSuffixText}>{formatDateWithSuffix(new Date()).daySuffix}</Text>
                        {` ${new Date().toLocaleDateString("en-GB", {
                            month: "long",
                            year: "numeric",
                        })}`}
                    </Text>
                </View>

                <Divider style={styles.divider} />

                {/* Calendar */}
                <View style={styles.calendarContainer}>
                    <Calendar
                        current={currentDate}
                        markedDates={{
                            [currentDate]: { selected: true, selectedColor: "red" },
                        }}
                        theme={{
                            todayTextColor: "red",
                            arrowColor: "black",
                            textDayFontWeight: "bold",
                            textMonthFontWeight: "bold",
                            textDayHeaderFontWeight: "bold",
                        }}
                        style={styles.calendar}
                    />
                </View>

                <Divider style={styles.divider} />

                <MenuView />
            </ScrollView>
        </LinearGradient>
    );
};

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: "#f7f7f7",
                    padding: 10,
                    marginTop: 10,
                    width: 300,
                    height: 600,
                },
                headerShown: false,
                drawerPosition: 'right', // Open drawer on the right side
            }}
        >
            <Drawer.Screen
                name="Dash_board"
                component={DashboardScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="calendar-outline" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="home" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Absences"
                component={AbsencesScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="checkmark-done" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Students"
                component={StudentsScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="people" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Teachers"
                component={TeachersScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="people" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Courses"
                component={CoursesScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="book" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Modules"
                component={ModulesScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="book" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Departments"
                component={DepartmentsScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="school" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Fields"
                component={FieldsScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="school" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="person" size={22} color="#ff6347" />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="settings" size={22} color="#ff6347" />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    calendarContainer: {
        marginBottom: 40,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: "#ff0000",
        elevation: 15,
    },
    menuIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    timeDateContainer: {
        alignItems: "right", // Center the items horizontally
        justifyContent: "right", // Center the items vertically
        marginTop: 40,
        marginBottom: 40,
        marginRight: 20,
        marginLeft: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: "#ff0000",
        elevation: 5,
    },
    iconTimeContainer: {
        flexDirection: "row",
        alignItems: "right",
        justifyContent: "right",
        marginBottom: 0,
    },
    icon: {
        marginRight: 10,
        marginTop: 10,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    timeText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    // amPmText: {
    //     fontSize: 16,
    //     fontWeight: "bold",
    //     color: "#333",
    //     marginLeft: 5,
    // },
    subtitle: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
        marginLeft: 73,
        marginTop: -20,
        marginBottom: 20,
    },
    todayText: {
        fontSize: 20,
        color: "#555",
        fontWeight: "bold",
    },
    dateText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        position: 'relative', // Position the suffix relative to the day
        display: 'inline-flex',
    },
    dateSuffixText: {
        fontSize: 14,
        fontWeight: 600,
        color: "#333",
        position: 'absolute', // Position the suffix absolutely to the day
        top: -5,
        right: -10,
    },
    calendar: {
        borderRadius: 15,
        overflow: "hidden", // Clip the calendar inside the border radius of the parent
        marginHorizontal: 20,
        backgroundColor: "white",
        shadowColor: "#ff0000",
        elevation: 5,
    },
    divider : {
        height: 4,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        marginHorizontal: 20,
        marginBottom: 40,
        shadowColor: "#ff0000",
        elevation: 15,
    }
});