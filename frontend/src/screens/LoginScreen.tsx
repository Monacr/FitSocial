import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LoginSVG from "assets/icon.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ justifyContent: "center", flex: 1, backgroundColor: '#0B0B3B' }}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 32,
                        fontWeight: "bold",
                        color: "#F5C528",
                        marginBottom: 20,
                        marginTop: 20,
                        textAlign: "center",
                    }}
                >
                    Fit Social
                </Text>

                <View style={{ alignItems: "center" }}>
                    {/* <img src={LoginSVG} alt = "Image" height={300} width={300}/> */}
                </View>
                <Text
                    style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 28,
                        fontWeight: "500",
                        color: "#F5C528",
                        marginBottom: 10,
                    }}
                >
                    Log In
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        marginBottom: 10,
                    }}
                >
                    <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{
                            marginRight: 5,
                        }}
                    />
                    <TextInput
                        placeholder="Email ID"
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            color: "#F5C528",
                        }}
                        keyboardType="email-address"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        marginBottom: 10,
                    }}
                >
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
                            color: "#F5C528",
                        }}
                        secureTextEntry={true}
                        placeholderTextColor="#ccc"
                    />

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{ color: "#F5C528", fontSize: 12 }}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("HomeStack");
                    }}
                    style={{
                        backgroundColor: "#F5C528",
                        paddingVertical: 10,
                        alignItems: "center",
                        borderRadius: 5,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: "#0B0B3B", fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <Text
                    style={{
                        textAlign: "center",
                        color: "#F5C528",
                        fontSize: 12,
                        marginTop: 20,
                        marginBottom: 15,
                    }}
                >
                    Or, login with...
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#F5C528" }}> Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
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

export default LoginScreen;
