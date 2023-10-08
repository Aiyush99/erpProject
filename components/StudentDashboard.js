import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import firestore from "@react-native-firebase/firestore"
import auth  from '@react-native-firebase/auth';

export default function StudentDashboard() {

  const [userData, setUserData] = useState(null);

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

  return (
    <View style={styles.container}>
    {userData ? (
      <>
        <Text style={styles.centeredText}>Name: {userData.name}</Text>
        <Text style={styles.centeredText}>Email: {userData.email}</Text>
        {/* Add more user data fields here */}
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
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  centeredText: {
    textAlign: 'center',      // Center the text within its container
    fontSize: 24,
    fontWeight: 'bold',
  },
})