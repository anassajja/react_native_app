import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";

const DashboardScreen = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setCurrentDate(dateString);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={30} color="#000" style={styles.menuIcon} />
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <View style={styles.timeContainer}>
        <Ionicons name="sunny" size={30} color="#F39C12" />
        <Text style={styles.timeText}>{new Date().toLocaleTimeString()}</Text>
        <Text style={styles.subtitle}>Realtime Insight</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.todayText}>Today:</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
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
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: "#f7f7f7" },
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE5E0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  timeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  dateContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  todayText: {
    fontSize: 20,
    color: "#555",
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  calendar: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
