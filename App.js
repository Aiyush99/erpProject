import { StyleSheet, Text, SafeAre, SafeAreaView,View } from 'react-native';
import React,{useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn_Admin from "./components/SignIn_admin"
import SignIn_Student from "./components/SignIn_student"
import LandingPage from './components/LandingPage';
import SignIn_teacher from './components/SignIn_teacher';
import SignUp_student from './components/SignUp_student';
import SignUp_Admin from './components/SignUp_admin';
import SignUp_Teacher from './components/SignUp_teacher';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function App() {

   
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='landing_page'>
      <Stack.Screen component={LandingPage} name="landing_page" options={{
          headerShown:false
        }}/>
       
        <Stack.Screen component={SignIn_Student} name="signin_student" options={{
          headerShown:false
        }}/>
         <Stack.Screen component={SignIn_Admin} name="signin_admin" options={{
          headerShown:false
        }}/>
         <Stack.Screen component={SignIn_teacher} name="signin_teacher" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={SignUp_student} name="signup_student" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={SignUp_Admin} name="signup_admin" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={SignUp_Teacher} name="signup_teacher" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={StudentDashboard} name="student_dash" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={TeacherDashboard} name="teacher_dash" options={{
          headerShown:false
        }}/>

        <Stack.Screen component={AdminDashboard} name="admin_dashs" options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
 }


const styles = StyleSheet.create({})