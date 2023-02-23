import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { interactive } from "../styles/Interactive";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={interactive.title}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            backgroundColor: "grey",
          }}
          source={require("../../assets/user1.png")}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "blue",
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          >
            9
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "grey",
              paddingHorizontal: 10,
            }}
          >
            Post
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "blue",
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          >
            9
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "grey",
              paddingHorizontal: 10,
            }}
          >
            Followers
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "blue",
              paddingHorizontal: 10,
              marginLeft: 10,
            }}
          >
            9
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "grey",
              paddingHorizontal: 10,
            }}
          >
            Following
          </Text>
        </View>
      </View>

      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> Username</Text>
      </View>

      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
      </View>

      <View style={{ marginLeft: 10, marginTop: 10, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

            
    </View>
  );
};

export default ProfileScreen;
