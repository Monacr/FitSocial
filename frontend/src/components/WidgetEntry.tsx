import DatePicker, { getToday } from "react-native-modern-datepicker";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { forwardRef, MutableRefObject, useState } from "react";
import { Date } from "../bindings/Date";
import { interactive } from "../styles/Interactive";
import { PrimaryBlue, PrimaryGold, URI } from "../constants";
import { ActionSheetRef } from "react-native-actions-sheet";
import { AppendWidgetEntry } from "../bindings/AppendWidgetEntry";
import { WidgetType } from "../bindings/WidgetType";
import { widgetTitle } from "../utils";

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

type PropsType = {
  widgetType: WidgetType;
  updateEntryCallback: () => void;
};
const WidgetEntry = forwardRef<ActionSheetRef, PropsType>(
  ({ widgetType, updateEntryCallback }, ref) => {
    const title = widgetTitle(widgetType);
    const [value, setValue] = useState("");
    const [date, setDate] = useState<Date>(dateFromStr(getToday()));
    const [selectingDate, setSelectingDate] = useState(getToday());
    const [showCalender, setShowcalender] = useState(false);

    function formattedDate(): string {
      if (date === null) {
        return "";
      }
      return `${months[date.month - 1]} ${date.day} ${date.year}`;
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

    function isValid() {
      return value && date;
    }

    async function submitEntry() {
      const unsafeRef = ref as MutableRefObject<ActionSheetRef>;
      unsafeRef.current?.hide();
      const widgetUpdate: AppendWidgetEntry = {
        widget_type: widgetType,
        date,
        value: Number(value),
      };

      await fetch(URI + "/users/updateWidgetEntry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(widgetUpdate),
      });

      updateEntryCallback();
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
          <View>
            <View style={styles.container}>
              <View style={styles.bar}>
                <Text style={{ fontWeight: "bold" }}>#</Text>
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
            <TouchableOpacity
              style={{ ...styles.button, opacity: isValid() ? 1 : 0.7 }}
              disabled={!isValid()}
              onPress={submitEntry}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
);

export default WidgetEntry;

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
