import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Signup } from "../bindings/Signup";
import { useEffect, useState } from "react";
import { URI } from "../constants";
import { interactive } from "../styles/Interactive";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [signupError, setSignupError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const getConfirmPassError = () => {
    if (confirmPass == "") {
      return "";
    } else if (confirmPass !== password) {
      return "Passwords do not match";
    } else {
      return null;
    }
  };
  useEffect(() => {
    setConfirmPassError(getConfirmPassError());
  }, [confirmPass]);

  const getPasswordError = () => {
    if (password == "") {
      return "";
    } else if (password.length < 8) {
      return "password must be at least 8 characters long";
    } else if (password.length > 50) {
      return "password must be at most 50 characters long";
    } else if (password.includes(" ")) {
      return "password cannot contain spaces";
    } else {
      return null;
    }
  };
  useEffect(() => {
    setPasswordError(getPasswordError());
  }, [password]);

  const getEmailError = async (): Promise<string> => {
    if (email == "") {
      return "";
    }
    // regex from https://stackoverflow.com/a/46181/1098564
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return "invalid email address";
    } else {
      try {
        const res = await fetch(URI + "/users/get/email/" + email);
        return res.ok ? "email has been taken" : null;
      } catch {
        return "";
      }
    }
  };
  useEffect(() => {
    const exec = async () => {
      setEmailError(await getEmailError());
    };
    exec();
  }, [email]);

  const getNameError = async (): Promise<string> => {
    if (name == "") {
      return "";
    } else if (name.length < 3) {
      return "name must be at least 3 characters long";
    } else if (name.length > 20) {
      return "name must be at most 20 characters long";
    } else if (name.includes(" ")) {
      return "name cannot contain spaces";
    } else {
      try {
        const res = await fetch(URI + "/users/get/name/" + name);
        return res.ok ? "username has been taken" : null;
      } catch {
        return "";
      }
    }
  };
  useEffect(() => {
    const exec = async () => {
      setNameError(await getNameError());
    };
    exec();
  }, [name]);

  useEffect(() => {
    const exec = async () => {
      setIsValid(
        getConfirmPassError() === null &&
          getPasswordError() === null &&
          (await getNameError()) === null &&
          (await getEmailError()) === null
      );
    };
    exec();
  }, [name, email, password, confirmPass]);
  const signupFailed = () => {
    setName("");
    setPassword("");
    setConfirmPass("");
    setEmail("");
    setSignupError("Signup error occured. Please try again.");
  };

  useEffect(() => {
    setSignupError("");
  }, [name, password, confirmPass, email]);

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
      .then((res) =>
        res.ok ? navigation.navigate("HomeStack") : signupFailed()
      )
      .catch((_) => signupFailed());
  };

  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={interactive.title}>Sign Up</Text>
        {signupError && <Text style={interactive.error}>signupError</Text>}

        <View style={interactive.bar}>
          <Ionicons
            name="pencil-outline"
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
          {nameError && <Text style={interactive.error}>{nameError}</Text>}
        </View>

        <View style={interactive.bar}>
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
          {emailError && <Text style={interactive.error}>{emailError}</Text>}
        </View>

        <View style={interactive.bar}>
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
          {passwordError && (
            <Text style={interactive.error}>{passwordError}</Text>
          )}
        </View>

        <View style={interactive.bar}>
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
            <Text style={interactive.error}>{confirmPassError}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={signup}
          disabled={!isValid}
          style={{
            ...interactive.primaryButton,
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
          <Text>Already Signed Up?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={interactive.linkButton}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
