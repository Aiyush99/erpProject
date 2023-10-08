import { StyleSheet, Text, View,TextInput,TouchableHighlight, ActivityIndicator,ImageBackground,Image,Dimensions,Alert } from 'react-native'
import React,{useState} from 'react'

const { width } = Dimensions.get('window')
export default function SignIn_teacher({navigation}) {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);

  return (
    <View style={styles.container}>
    <ImageBackground source={require("../assets/image.jpg")} resizeMode='cover' style={styles.imgbackground}>

    <Image style={{width:"30%",height:"15%",borderRadius:60,marginBottom:20}} source={require("../assets/logo.jpg")}/>

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
    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}>
      <Text style={styles.signUpText}>Login</Text>
    </TouchableHighlight>

    <TouchableHighlight style={[styles.signUpText]} onPress={() => navigation.navigate("signup_teacher")}>
      <Text style={styles.signUpText}>Don't Have an Account? Register as Teacher</Text>
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