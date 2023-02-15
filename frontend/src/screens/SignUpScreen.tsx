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
import { useEffect, useState } from "react";
import { URI } from "../constants";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  useEffect(() => {
    if (confirmPass == "") {
      setConfirmPassError("");
    } else if (confirmPass !== password) {
      setConfirmPassError("Passwords do not match");
    } else {
      setConfirmPassError(null);
    }
  }, [confirmPass]);

  useEffect(() => {
    if (password == "") {
      setPasswordError("");
    } else if (password.length < 8) {
      setPasswordError("password must be at least 8 characters long");
    } else if (password.length > 50) {
      setPasswordError("password must be at most 50 characters long");
    } else if (password.includes(" ")) {
      setPasswordError("password cannot contain spaces");
    } else {
      setPasswordError(null);
    }
  }, [password]);

  useEffect(() => {
    if (email == "") {
      setEmailError("");
      return;
    }
    // regex from https://stackoverflow.com/a/46181/1098564
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setEmailError("invalid email address");
    } else {
      fetch(URI + "/users/get/email/" + email)
        .then((res) =>
          res.ok ? setEmailError("email has been taken") : setEmailError(null)
        )
        .catch((_) => setEmailError(""));
    }
  }, [email]);

  useEffect(() => {
    const setError = async () => {
      if (name == "") {
        setNameError("");
      } else if (name.length < 3) {
        setNameError("name must be at least 3 characters long");
      } else if (name.length > 20) {
        setNameError("name must be at most 20 characters long");
      } else if (name.includes(" ")) {
        setNameError("name cannot contain spaces");
      } else {
        try {
          const res = await fetch(URI + "/users/get/name/" + name);
          res.ok ? setNameError("username has been taken") : setNameError(null);
        } catch {
          setNameError("");
        }
      }
    };
    setError();
  }, [name]);

  const isValid = (): boolean => {
    return (
      confirmPassError === null &&
      passwordError === null &&
      nameError === null &&
      emailError === null
    );
  };

  const signup = () => {
    if (!isValid()) {
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
      .then((_) => navigation.navigate("HomeStack"))
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
            secureTextEntry={false}
            onChangeText={setName}
          />
          {nameError && <Text style={style.error}>{nameError}</Text>}
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
          {emailError && <Text style={style.error}>{emailError}</Text>}
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
          {passwordError && <Text style={style.error}>{passwordError}</Text>}
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
          {confirmPassError && (
            <Text style={style.error}>{confirmPassError}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={signup}
          disabled={!isValid()}
          style={{
            backgroundColor: "#4287f5",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 5,
            marginTop: 20,
            opacity: isValid() ? 1 : 0.7,
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
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default SignUpScreen;
