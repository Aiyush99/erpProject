import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import LandingPage from './components/LandingPage';
import SignInStudent from './components/SignIn_student';
import SignInAdmin from './components/SignIn_admin';
import SignInTeacher from './components/SignIn_teacher';
import SignUpStudent from './components/SignUp_student';
import SignUpAdmin from './components/SignUp_admin';
import SignUpTeacher from './components/SignUp_teacher';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';
import firestore from "@react-native-firebase/firestore"

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState(null);
  const [initialRouteName, setInitialRouteName] = useState('landing_page'); // Default initial route

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

 useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
 }, [])

 useEffect(() => {
  if (!initializing) {
    // User is authenticated, fetch userRole from different collections
    const userId = user ? user.uid : null; // Get the user's UID

    if (userId) {
      const collectionNames = ['StudentsData', 'TeachersData', 'AdminData'];
      const userRoles = [];

      const fetchUserRolesPromises = collectionNames.map((collectionName) => {
        const docRef = firestore().collection(collectionName).doc(userId);
        return docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const userRole = doc.data().userRole;
              userRoles.push({ collectionName, userRole });
            } else {
              userRoles.push({ collectionName, userRole: null });
            }
          })
          .catch((error) => {
            console.error(`Error fetching userRole from ${collectionName}:`, error);
            userRoles.push({ collectionName, userRole: null });
          });
      });

      Promise.all(fetchUserRolesPromises)
        .then(() => {
          const foundUserRole = userRoles.find((role) => role.userRole);
          if (foundUserRole) {
            // User role found in one of the collections, determine the initial route
            const userRole = foundUserRole.userRole;
            if (userRole === 'student') {
              setInitialRouteName('student_dash');
            } else if (userRole === 'teacher') {
              setInitialRouteName('teacher_dash');
            } else if (userRole === 'admin') {
              setInitialRouteName('admin_dash');
            }

          }
        })
        .catch((error) => {
          console.error('Error fetching userRoles:', error);
        });
    }
  }
}, [initializing, user]);


 if (initializing) return null;


   if (!user) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='landing_page'>
        <Stack.Screen
          component={LandingPage}
          name="landing_page"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignInStudent}
          name="signin_student"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignInAdmin}
          name="signin_admin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignInTeacher}
          name="signin_teacher"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUpStudent}
          name="signup_student"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUpAdmin}
          name="signup_admin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUpTeacher}
          name="signup_teacher"
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
   }
   else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
        
    <Stack.Screen
    component={StudentDashboard}
    name="student_dash"
    options={{ headerShown: false }}
  />
  <Stack.Screen
    component={TeacherDashboard}
    name="teacher_dash"
    options={{ headerShown: false }}
  />
  <Stack.Screen
    component={AdminDashboard}
    name="admin_dash"
    options={{ headerShown: false }}
  />
 
  </Stack.Navigator>
  </NavigationContainer>
    );
   }
}
