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
import { PrimaryGold, URI } from "../constants";
import { interactive } from "../styles/Interactive";
import { useAuth } from "../components/AuthProvider";

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

  const { setAuthenticated } = useAuth();

  //Checks on the signup screen if the two passwords match
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

  // checks if the password is less than 8 chars or more than 50 and if it includes spaces
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
  //if the password is not connected to the user then it will return an error
  useEffect(() => {
    setPasswordError(getPasswordError());
  }, [password]);

  //makes sure the email is valid
  const getEmailError = async (): Promise<string> => {
    if (email == "") {
      return "";
    }
    // regex from https://stackoverflow.com/a/46181/1098564
    //checks if the email is valid
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return "invalid email address";
    } else {
      try {
        //checks if the email is already in use
        const res = await fetch(URI + "/users/email/" + email);
        return res.ok ? "email has been taken" : null;
      } catch {
        return "";
      }
    }
  };
  //returns an error if the email is in use or is not in the valid format of an email
  useEffect(() => {
    const exec = async () => {
      setEmailError(await getEmailError());
    };
    exec();
  }, [email]);

  // checks if the name has been taken or is less than 3 chars or more than 20
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
        const res = await fetch(URI + "/users/" + name);
        return res.ok ? "username has been taken" : null;
      } catch {
        return "";
      }
    }
  };
  //returns an error if the name is invalid
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
  //Returns the value of signupError if they incorrectly filled out the fields
  const signupFailed = () => {
    setName("");
    setPassword("");
    setConfirmPass("");
    setEmail("");
    setSignupError("Signup error occured. Please try again.");
  };

  //returns the setSignUpError when incorrectly signed up
  useEffect(() => {
    setSignupError("");
  }, [name, password, confirmPass, email]);

  //returns when the signup data is valid
  const signup = () => {
    if (!isValid) {
      return;
    }
    //stores the data
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
      .then((res) => (res.ok ? setAuthenticated(name) : signupFailed()))
      .catch((_) => signupFailed());
  };
  // Returns the css and TypeScripts of the page. The style and the components of the screen
  return (
    <SafeAreaView
      style={{ justifyContent: "center", flex: 1}}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={interactive.titleTwo}>Fit Social</Text>
        <Text style={interactive.titleThree}>Fit Social</Text>
        <Text style={interactive.title}>Sign Up</Text>
        {signupError && <Text style={interactive.error}>signupError</Text>}

        <View style={interactive.bar}>
          <Ionicons
            name="pencil-outline"
            size={20}
            color="#000080"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Username"
            style={{
              flex: 1,
              paddingVertical: 0,
              color: "#666",
            }}
            secureTextEntry={false}
            autoComplete="off"
            onChangeText={setName}
          />
          {nameError && <Text style={interactive.error}>{nameError}</Text>}
        </View>

        <View style={interactive.bar}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#000080"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Email"
            style={{
              flex: 1,
              paddingVertical: 0,
              color: "#666",
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
            color="#000080"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Password"
            style={{
              flex: 1,
              paddingVertical: 0,
              color: "#666",
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
            color="#000080"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{
              flex: 1,
              paddingVertical: 0,
              color: "#666",
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
            backgroundColor: PrimaryGold,
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
          <Text style={{ color: "#666" }}>Already Signed Up?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ ...interactive.linkButton, color: "#000080" }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
