import { View, StyleSheet, Text } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ForwardedRef, forwardRef } from "react";
import { PrimaryBlue, PrimaryGold } from "../constants";

type PropsType = { title: String; children: JSX.Element };
const BottomPopupSheet = forwardRef<ActionSheetRef, PropsType>(
  ({ title, children }, ref) => {
    return (
      <ActionSheet ref={ref}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line}></View>
        {children}
      </ActionSheet>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    fontSize: 20,
    color: PrimaryBlue,
    alignSelf: "center",
    fontWeight: "bold",
  },
  line: {
    flexDirection: "row",
    borderBottomColor: PrimaryGold,
    borderBottomWidth: 1,
    paddingTop: 5,
  },
});

export default BottomPopupSheet;
