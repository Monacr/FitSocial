import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import LoginSVG from 'assets/icon.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignUpScreen from "./SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";


const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ justifyContent: 'center', flex: 1 }}>
      <View style={{paddingHorizontal: 20}}>
      <View style={{ alignItems: 'center' }}>
        {/* <img src={LoginSVG} alt = "Image" height={300} width={300}/> */}
      </View>
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 28,
          fontWeight: '500',
          color: '#333',
          marginBottom: 10,
        }}>
        Login
      </Text>

      <View 
      style={{
        flexDirection:'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
    }}>
      <MaterialIcons name="alternate-email" size={20} color="#666" style={{marginRight: 5
      }} />
      <TextInput placeholder='Email ID' 
      style={{
      flex:1,
      paddingVertical:0,
      }}
      keyboardType='email-address'
      />

      </View>

      <View 
      style={{
        flexDirection:'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
    }}>
      <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{marginRight: 5
      }} />
      <TextInput placeholder='Password' 
      style={{
      flex:1,
      paddingVertical:0,
      }}
      secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => {}}>
      <Text style={{color: '#333', fontSize: 12}}>Forgot Password?</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => {}} style={{backgroundColor:'#4287f5', paddingVertical: 10, alignItems: 'center', borderRadius: 5, marginTop: 20}}>
        <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
      </TouchableOpacity>

      <Text style = {{textAlign: 'center', color: '#333', fontSize: 12, marginTop: 20}}>
        Or, login with...
      </Text>

      <View style = {{flexDirection: 'row', justifyContent:'space-between', marginBottom: 30}}>
        
        <TouchableOpacity onPress={() => {}} 
      style={{
      borderColor: '#ddd',
      borderWidth:2,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30
    }}> 
        <Ionicons name="logo-google" height={24} width = {24}/>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} 
      style={{
      borderColor: '#ddd',
      borderWidth:2,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30
    }}> 
        <Ionicons name="logo-google" height={24} width = {24}/>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
      }} 
      style={{
      borderColor: '#ddd',
      borderWidth:2,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30
    }}> 
        <Ionicons name="logo-google" height={24} width = {24}/>

      </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Text> New to the App?</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('SignUp');
    }}>
        <Text style={{color: '#4287f5', fontSize: 16, marginLeft: 5}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen





// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { URI } from "../constants";

// export default function LoginScreen() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   async function login() {
//     try {
//       const resp = await fetch(URI + "/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (resp.ok) {
//         setError("");
//         // navigate to another page or show success message
//       } else {
//         setError(await resp.text());
//       }
//     } catch (_) {
//       setError("Network error");
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.error}>{error}</Text>
//       <TextInput
//         style={styles.input}
//         value={username}
//         onChangeText={setUsername}
//         placeholder="Username"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={login}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   error: {
//     color: "red",
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     width: "100%",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: "#4287f5",
//     padding: 10,
//     width: "100%",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
// });
