import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LoginInfo } from "../bindings/LoginInfo";
import { URI } from "../constants";
import { interactive } from "../styles/Interactive";

const LoginScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(name.length > 0 && password.length > 0);
    }, [name, password]);

    const loginFailed = () => {
        setError("Incorrect username or password");
        setName("");
        setPassword("");
    };

    const leavePage = (nextPage: string) => {
        navigation.navigate(nextPage);
        setError(null);
        setName("");
        setPassword("");
    };
    const submit = () => {
        const data: LoginInfo = { username: name, password };

        fetch(URI + "/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    leavePage("HomeStack");
                } else {
                    loginFailed();
                }
            })
            .catch((_) => loginFailed());
    };

    const styles = StyleSheet.create({
        title: {
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#F5C528",
            marginBottom: 10,
        },
        error: {
            color: "red",
        },
        bar: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#000080",
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        primaryButton: {
            backgroundColor: "#F5C528",
            borderRadius: 5,
            paddingVertical: 10,
            alignItems: "center",
            marginBottom: 20,
        },
        linkButton: {
            color: "#666",
            marginLeft: 5,
        },
        titleTwo: {
            fontFamily: "Roboto-Medium",
            fontSize: 32,
            fontWeight: "bold",
            color: "#F5C528",
            marginBottom: 20,
            marginTop: 20,
            textAlign: "center",
        }
    });

    return (
        <SafeAreaView style={{ justifyContent: "center", flex: 1, backgroundColor: '#0B0B3B' }}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={styles.titleTwo}
                >
                    Fit Social
                </Text>
                <Text style={{fontFamily: "Roboto-Medium",
                    fontSize: 28,
                    fontWeight: "500",
                    color: "#F5C528",
                    marginBottom: 10,}}>Log In</Text>

                {error && (
                    <Text style={{ ...styles.error, marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <View style={styles.bar}>
                    <Ionicons
                        name="pencil-outline"
                        size={20}
                        color= "#F5C528"
                        style={{
                            marginRight: 5,
                            color: "#666"
                        }}
                    />
                    <TextInput
                        placeholder="Username"
                        onChangeText={setName}
                        value={name}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            color: "#666",
                        }}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.bar}>
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        style={{
                            marginRight: 5,
                            color: "#666"
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            color: "#666"
                        }}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{ color: "#666", fontSize: 12 }}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={submit}
                    disabled={!isValid}
                    style={{ ...styles.primaryButton, opacity: isValid ? 1 : 0.7 }}
                >
                    <Text style={{ color: "#666", fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                    }}
                >
                    <Text style={{ color: "#F5C528" }}> Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            leavePage("SignUp");
                        }}
                    >
                        <Text style={styles.linkButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

