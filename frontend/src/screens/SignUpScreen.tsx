import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Signup } from "../bindings/Signup";
import { useState } from "react";
import { URI } from "../constants";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const signup = () => {
    if (password != confirmPass) {
      alert("Passwords don't match up");
      return;
    }
    if (name == "" || email == "" || password == "") {
      alert("Please fill in all the fields");
      return;
    }

    const data: Signup = {
      name,
      password,
      email,
    };

    fetch(URI + "/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => alert("Signed up successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={style.title}>Sign Up</Text>

        <View style={style.bar}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Username"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            secureTextEntry={true}
            onChangeText={setName}
          />
        </View>

        <View style={style.bar}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Email"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>

        <View style={style.bar}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Password"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <View style={style.bar}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            secureTextEntry={true}
            onChangeText={setConfirmPass}
          />
        </View>

        <TouchableOpacity
          onPress={signup}
          style={{
            backgroundColor: "#4287f5",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Sign Up</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> Already Signed Up?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ color: "#4287f5", fontSize: 16, marginLeft: 5 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 50,
  },
  bar: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 20,
  },
});

export default SignUpScreen;
