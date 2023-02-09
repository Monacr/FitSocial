// import {View, Text, TextInput, TouchableOpacity} from 'react-native'
// import React from 'react'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';


// export default function InputField({label, icon, inputType, keyboardType, fieldButtonLabel, fieldButonFunction,
// }) {
//     return (
//     <View 
//       style={{
//         flexDirection:'row',
//         borderBottomColor: '#ccc',
//         borderBottomWidth: 1,
//         paddingBottom: 5,
//         marginBottom: 10,
//     }}>
//         {icon}
//         {inputType == 'password' ? (
//             <TextInput
//             placeholder={label} 
//             keyboardType= {keyboardType}
//             style={{
//             flex:1,
//             paddingVertical:0,
//             }}
//             secureTextEntry={true}
//             />
//             ) : (
//             <TextInput
//             placeholder={label}
//             keyboardType = {keyboardType}
//             style={{
//             flex:1,
//             paddingVertical:0,
//             }}
//             />
//         )}




    
//       <TouchableOpacity onPress={fieldButonFunction}>
//       <Text style={{color: '#333', fontSize: 12}}>Forgot Password?</Text>
//       </TouchableOpacity>
//       </View>
//     );
// };