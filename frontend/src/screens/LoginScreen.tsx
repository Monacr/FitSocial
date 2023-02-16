import { useEffect, useState } from "react";
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

    return (
        <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ alignItems: "center" }}></View>
                <Text style={interactive.title}>Log In</Text>

                {error && (
                    <Text style={{ ...interactive.error, marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

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
                        onChangeText={setName}
                        value={name}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                        }}
                        keyboardType="email-address"
                    />
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
                        value={password}
                        onChangeText={setPassword}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                        }}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{ color: "#333", fontSize: 12 }}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={submit}
                    disabled={!isValid}
                    style={{ ...interactive.primaryButton, opacity: isValid ? 1 : 0.7 }}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                    }}
                >
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            leavePage("SignUp");
                        }}
                    >
                        <Text style={interactive.linkButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

