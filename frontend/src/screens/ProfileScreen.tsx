import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Share from "react-native-share";
import { useAuth } from "../components/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PrimaryBlue } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = ({ navigation }) => {
  const { authUser } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.icon}>
          <Ionicons
            name="person-outline"
            size={60}
            style={{ alignSelf: "center" }}
          />
        </View>

        <View style={{ marginLeft: 20 }}>
          <Title
            style={{
              marginTop: 15,
              marginBottom: 5,
            }}
          >
            {authUser}
          </Title>
          <Caption>{authUser}@gmail.com</Caption>
        </View>
      </View>
      <TouchableOpacity key="add">
        <LinearGradient
          style={styles.add}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={[PrimaryBlue, "blue"]}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
            Upload Post
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    margin: 30,
  },
  userInfoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    textAlign: "center",
    backgroundColor: "#CFCFCF",
    borderRadius: 100,
    height: 75,
    width: 75,
  },
  add: {
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    width: 150,
  },
});
