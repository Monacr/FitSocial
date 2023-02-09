import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignUpScreen from "./SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ justifyContent: "center", flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Login
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
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email ID"
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
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            <Text style={{ color: "#333", fontSize: 12 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
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
          style={{ marginRight: 5 }}
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
          <Text style={{ color: "#333", fontSize: 12 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {}}
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

      <Text
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: 12,
          marginTop: 20,
        }}
      >
        Or, login with...
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: "#ddd",
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}
        >
          <Ionicons name="logo-google" height={24} width={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: "#ddd",
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}
        >
          <Ionicons name="logo-google" height={24} width={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderColor: "#ddd",
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}
        >
          <Ionicons name="logo-google" height={24} width={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> New to the App?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#4287f5", fontSize: 16, marginLeft: 5 }}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: 12,
            marginTop: 20,
          }}
        >
          Or, login with...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
          >
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> New to the App?</Text>
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
