import { StyleSheet, Text, TouchableOpacity, View, Alert ,ViewStyle,Modal, FlatList,TouchableWithoutFeedback} from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

export default function AdminDashboard() {

  const [userData, setUserData] = useState(null);
  const [teacherList, setTeacherList] = useState([]); // Replace with your teacher data
  const [studentList, setStudentList] = useState([]); // Replace with your student data
  const [isTeacherListVisible, setTeacherListVisible] = useState(false);
  const [isStudentListVisible, setStudentListVisible] = useState(false);
  const [loading,setLoading] = useState(false);

  const user = auth().currentUser;

  const fetchTeachers = () => {
    if (user) {
      
      firestore()
            .collection('TeachersData')
            .get()
            .then((querySnapshot) => {
              const teachers = [];
              querySnapshot.forEach((doc) => {
                teachers.push(doc.data());
              });
              console.log(teachers)
              setTeacherList(teachers);
            })
            .catch((error) => {
              console.error('Error fetching teacher data: ', error);
            });
      setTeacherList(null);
    }
  }

  const fetchStudents = () => {
    if (user) {
      
      firestore()
            .collection('StudentsData')
            .get()
            .then((querySnapshot) => {
              const teachers = [];
              querySnapshot.forEach((doc) => {
                teachers.push(doc.data());
              });
              console.log(teachers)
              setStudentList(teachers);
            })
            .catch((error) => {
              console.error('Error fetching student data: ', error);
            });
      setStudentList(null);
    }
  }


  useEffect(() => {
    // Get the current user
  
    if (user) {
      // Use the user's UID to query Firestore
      const userRef = firestore().collection('AdminData').doc(user.uid);

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

  

  useEffect(() => {
   fetchTeachers();
   fetchStudents();
  }, [])
  

  const LogOutFunc = () => {
    auth().signOut().then(() => Alert.alert("Signing out Admin "))
  }

  return (
    <View style={styles.container}>

     
      <Text style={styles.title}>Admin Dashboard</Text>
      {userData ? (
        <>

      <TouchableOpacity  style={styles.logoutButton} onPress={LogOutFunc}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>

          <GradientButton text="Teacher List" onPress={() => setTeacherListVisible(true)} />
          <GradientButton text="Student List" onPress={() => setStudentListVisible(true)} />


        </>
      ) : (
        <Text style={styles.centeredText}>Loading admin data...</Text>
      )}

       {/* Teacher List Modal */}
       <Modal animationType="slide" transparent={true} visible={isTeacherListVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Teacher List</Text>
          <FlatList
            data={teacherList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                {/* Add more teacher details */}
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setTeacherListVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Student List Modal */}
      <Modal animationType="slide" transparent={true} visible={isStudentListVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Student List</Text>
          <FlatList
            data={studentList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                {/* Add more student details */}
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setStudentListVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const GradientButton = ({ text, onPress }) => {
  const [isPressed, setPressed] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={isPressed ? ['#3c6ab7', '#2a4d86'] : ['#3c6ab7', '#2a4d86']}
          style={styles.gradientButton}
        >
          <Text style={styles.gradientButtonText}>{text}</Text>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
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
  listButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  buttonContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 10,
  },
  gradientButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeModalButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
  },
})