import { StyleSheet } from "react-native";
import {PrimaryBlue, PrimaryGold} from "../constants";

export const interactive = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: PrimaryGold,
    marginBottom: 20,
  },

  titleTwo: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: PrimaryBlue,
    marginBottom: 50,
    textAlign: "center",
  },

  titleThree: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: PrimaryBlue,
    marginBottom: 50,
    textAlign: "center",
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
  primaryButton: {
    backgroundColor: PrimaryBlue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  linkButton: { color: PrimaryBlue, fontSize: 16, marginLeft: 5 },
});
