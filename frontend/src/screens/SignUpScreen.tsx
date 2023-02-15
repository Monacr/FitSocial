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
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const err = getConfirmPassError();
    if (err !== null) {
      setConfirmPassError(err);
    } else {
      setConfirmPassError("");
    }
  }, [confirmPass]);

  const getConfirmPassError = (): string | null => {
    if (confirmPass == "") {
      return "";
    }

    if (confirmPass !== password) {
      return "Passwords do not match";
    }

    return null;
  };

  useEffect(() => {
    const err = getPasswordError();
    if (err !== null) {
      setPasswordError(err);
    } else {
      setPasswordError("");
    }
  }, [password]);

  const getPasswordError = (): string | null => {
    if (password == "") {
      return "";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (password.length > 20) {
      return "Password must be at most 20 characters long";
    }
    if (password.includes(" ")) {
      return "Password cannot contain spaces";
    }
    return null;
  };

  useEffect(() => {
    const setError = async () => {
      const err = await getEmailError();
      if (err !== null) {
        setEmailError(err);
      } else {
        setEmailError("");
      }
    };
    setError();
  }, [email]);

  const getEmailError = async (): Promise<string | null> => {
    if (email == "") {
      return "";
    }
    // regex from https://stackoverflow.com/a/46181/1098564
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return "Please enter a valid email address";
    }

    // Check if email already exists
    try {
      const res = await fetch(URI + "/users/get/email/" + email);
      if (res.ok) {
        return "email has been taken";
      } else {
        return null;
      }
    } catch (_) {
      return null;
    }
  };

  useEffect(() => {
    const setError = async () => {
      const err = await getNameError();
      if (err !== null) {
        setNameError(err);
      } else {
        setNameError("");
      }
    };
    setError();
  }, [name]);

  const getNameError = async (): Promise<string | null> => {
    if (name == "") {
      return "";
    }

    if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }

    if (name.length > 20) {
      return "Name must be at most 20 characters long";
    }

    if (name.includes(" ")) {
      return "Name cannot contain spaces";
    }

    // Check if username already exists
    try {
      const res = await fetch(URI + "/users/get/name/" + name);
      if (res.ok) {
        return "username has been taken";
      } else {
        return null;
      }
    } catch (_) {
      return null;
    }
  };

  const signup = () => {
    if (!isValid) {
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
      .then((_) => navigation.navigate("Home"))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const setValid = async () => {
      setIsValid(
        getConfirmPassError() === null &&
          getPasswordError() === null &&
          (await getNameError()) === null &&
          (await getEmailError()) === null
      );
    };
    setValid();
  }, [name, password, confirmPass, emailError]);

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
          {nameError.length > 0 && <Text style={style.error}>{nameError}</Text>}
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
          {emailError.length > 0 && (
            <Text style={style.error}>{emailError}</Text>
          )}
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
          {passwordError.length > 0 && (
            <Text style={style.error}>{passwordError}</Text>
          )}
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
          {confirmPassError.length > 0 && (
            <Text style={style.error}>{confirmPassError}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={signup}
          disabled={!isValid}
          style={{
            backgroundColor: "#4287f5",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 5,
            marginTop: 20,
            opacity: isValid ? 1 : 0.7,
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
