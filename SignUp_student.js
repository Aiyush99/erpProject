import { StyleSheet, Text, View,TextInput,TouchableHighlight, ActivityIndicator,ImageBackground,Image,Dimensions,Alert } from 'react-native'
import React,{useState} from 'react'
import auth  from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
const { width } = Dimensions.get('window')

export default function SignUp_student({navigation}) {

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);
    const [showAlertState,setShowAlert] = useState(false)

    const showAlert = () => {
      setShowAlert(true);
    };
  
    const hideAlert = () => {
      setShowAlert(false);
    };

const saveUser = async () => {
  if (!name || !email || !password) {
    Alert.alert("Enter all the required fields");
  } else {
    setLoading(true);
    try {
      // Create the user using Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Update the user's display name
      await userCredential.user.updateProfile({
        displayName: name
      });

      // Save user information to Firestore
      await firestore()
        .collection('StudentsData') // Replace with your Firestore collection name
        .doc(userCredential.user.uid) // Use the user's UID as the document ID
        .set({
          name: name,
          email: email,
          userRole:"student"
          // Add more user information as needed
        });

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log("inside error");
        showAlert();
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    } finally {
      console.log("passed");
      navigation.navigate("student_dash")
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  }
};


  return (
    <View style={styles.container}>
    <ImageBackground source={require("../assets/image.jpg")} resizeMode='cover' style={styles.imgbackground}>

    <Image style={{width:"30%",height:"15%",borderRadius:60,marginBottom:20}} source={require("../assets/logo.jpg")}/>

    <View style={styles.inputContainer}>
      
      <TextInput style={styles.inputs}
          placeholder="Name"
          value={name}
          underlineColorAndroid='transparent'
          onChangeText={(text)=>{setName(text)}}/>
    </View>

    <View style={styles.inputContainer}>
      
      <TextInput style={styles.inputs}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(text)=>{setEmail(text)}}/>
    </View>
    
    <View style={styles.inputContainer}>
   
      <TextInput style={styles.inputs}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(text) => {setPassword(text)}}/>
    </View>

    {loading ? <ActivityIndicator size='large' color="green"/>
    :<>
    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={saveUser}>
      <Text style={styles.signUpText}>Register</Text>
    </TouchableHighlight>

    <TouchableHighlight style={[styles.signUpText]} onPress={() => navigation.navigate("signin_student")}>
      <Text style={styles.signUpText}>Already Have an Account? Login as Student</Text>
    </TouchableHighlight>
    </>
    }
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
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:350,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
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