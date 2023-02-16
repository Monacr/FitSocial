import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center" }}></View>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
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
          <Ionicons
            name="pencil-outline"
            size={20}
            color="#666"
            style={{
              marginRight: 5,
            }}
          />
          <TextInput
            placeholder="Email or username"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            keyboardType="email-address"
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
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
          style={{
            backgroundColor: "#4287f5",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Login</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#4287f5", fontSize: 16, marginLeft: 5 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
