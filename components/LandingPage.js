import { StyleSheet, Text, View,TouchableHighlight,ImageBackground,Image,Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

export default function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/image.jpg")} resizeMode='cover' style={styles.imgbackground}>

        <Image style={{width:"30%",height:"15%",borderRadius:60,marginBottom:20}} source={require("../assets/logo.jpg")}/>

       
        <TouchableHighlight  style={[styles.buttonContainer, styles.signupButton]} onPress={()=>navigation.navigate("signin_student")}>
          <Text style={styles.signUpText}>Login as Student</Text>
        </TouchableHighlight>

        <TouchableHighlight  style={[styles.buttonContainer, styles.signupButton]} onPress={()=>navigation.navigate("signin_admin")}>
          <Text style={styles.signUpText}>Login as Admin</Text>
        </TouchableHighlight>

        <TouchableHighlight  style={[styles.buttonContainer, styles.signupButton]} onPress={()=>navigation.navigate("signin_teacher")}>
          <Text style={styles.signUpText}>Login as Teacher</Text>
        </TouchableHighlight>

        </ImageBackground>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }, 
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:350,
        borderRadius:30,
      },
      signupButton: {
        backgroundColor: "#1ED661",
      },
      signUpText: {
        color: 'white',
        fontSize:20
      },
      signintext:{
        color:"white",
        fontSize:20
      },
      imgbackground:{
        width:width,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:1.5
    },
})