import DatePicker, { getToday } from "react-native-modern-datepicker";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { Date } from "../bindings/Date";
import { interactive } from "../styles/Interactive";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryBlue, PrimaryGold } from "../constants";

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type PropType = {
  title: string;
};
export default function WidgetEntry({ title }: PropType) {
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date>(dateFromStr(getToday()));
  const [selectingDate, setSelectingDate] = useState(getToday());
  const [showCalender, setShowcalender] = useState(false);

  function formattedDate(): string {
    if (date === null) {
      return "";
    }
    return `${months[date.month]} ${date.day} ${date.year}`;
  }

  function dateFromStr(str: String): Date {
    const tokens = str.split("/").map((t) => Number(t));
    return {
      day: tokens[2],
      month: tokens[1],
      year: tokens[0],
    };
  }

  function changeDate() {
    setShowcalender(false);
    setDate(dateFromStr(selectingDate));
  }
  return (
    <>
      {showCalender && (
        <>
          <DatePicker
            mode="calendar"
            onSelectedChange={setSelectingDate}
            selected={selectingDate}
            maximumDate={getToday()}
            options={{ mainColor: PrimaryGold }}
          />
          <TouchableOpacity style={styles.button} onPress={changeDate}>
            <Text style={{ color: "white" }}>Choose Date</Text>
          </TouchableOpacity>
        </>
      )}

      {!showCalender && (
        <View style={styles.container}>
          <View style={styles.bar}>
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
            <TextInput
              placeholder={title}
              onChangeText={setValue}
              value={value}
              style={styles.input}
              placeholderTextColor={PrimaryGold}
              keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.bar}>
            <Text style={{ fontWeight: "bold" }}>Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowcalender(true)}
            >
              <TextInput
                placeholder="Date"
                pointerEvents="none"
                value={formattedDate()}
                style={styles.input}
                placeholderTextColor={PrimaryGold}
                keyboardType="numeric"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 50,
    paddingTop: 20,
  },
  bar: {
    ...interactive.bar,
    margin: 30,
    alignSelf: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    textAlign: "right",
    color: PrimaryBlue,
  },
  button: {
    ...interactive.primaryButton,
    top: "-10%",
    marginBottom: 20,
    alignSelf: "center",
    width: "50%",
  },
});
