import { StyleSheet, Text, TouchableOpacity, View, Alert ,ViewStyle} from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import { PieChart } from 'react-native-svg-charts';

export default function StudentDashboard() {

  const [userData, setUserData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([
    { name: 'Present', value: 70, color: '#00FF00' }, // Green for Present
    { name: 'Absent', value: 30, color: '#0000FF' },  // Blue for Absent
  ]);

  const calculateTotalValue = () => {
    return attendanceData.reduce((total, data) => total + data.value, 0);
  };


  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;

    if (user) {
      // Use the user's UID to query Firestore
      const userRef = firestore().collection('StudentsData').doc(user.uid);

      // Subscribe to changes in the user document
      const unsubscribe = userRef.onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // Data for the user exists
          const data = documentSnapshot.data();
          setUserData(data);
        } else {
          // User document does not exist
          setUserData(null);
        }
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    } else {
      // User is not signed in
      setUserData(null);
    }

    
  }, []);

  

  const LogOutFunc = () => {
    auth().signOut().then(() => Alert.alert("Signing out Student "))
  }

  const renderPieSlice = (data, index) => {
    const degrees = (data.value / calculateTotalValue()) * 360;
    const color = data.color;

    return (
      <View
        key={index}
        style={{
          width: 100,
          height: 100,
          backgroundColor: color,
          borderRadius: 50,
          transform: [{ rotate: `${degrees}deg` }],
          position: 'absolute',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>

     
      <Text style={styles.title}>Student Dashboard</Text>
      {userData ? (
        <>

      <TouchableOpacity  style={styles.logoutButton} onPress={LogOutFunc}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>Richa</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Roll Number:</Text>
            <Text style={styles.value}>102</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Course:</Text>
            <Text style={styles.value}>B-Tech</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>Engineering</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Stream:</Text>
            <Text style={styles.value}>ECE</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Studying Year:</Text>
            <Text style={styles.value}>2023</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Batch:</Text>
            <Text style={styles.value}>2019</Text>
          </View>

       
          <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Attendance Chart</Text>
        <View style={styles.pieChart}>
          {attendanceData.map((data, index) => renderPieSlice(data, index))}
        </View>
      </View>

        </>
      ) : (
        <Text style={styles.centeredText}>Loading user data...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  logoutText: {
    fontSize: 16,
    color: 'blue',
  },
  centeredText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pieChart: {
    width: 200,
    height: 200,
    transform: [{ rotate: '-90deg' }],
  },
})