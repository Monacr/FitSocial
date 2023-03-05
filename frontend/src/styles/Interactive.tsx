import { StyleSheet } from "react-native";
import { PrimaryBlue } from "../constants";

export const interactive = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: PrimaryBlue,
    marginBottom: 40,
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
  linkButton: { color: "#4287f5", fontSize: 16, marginLeft: 5 },
});
