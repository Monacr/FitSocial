import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import GraphWidget from "./widgets/GraphWidget";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { Widget } from "../bindings/Widget";
import { PrimaryGold, URI } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ActionSheetRef } from "react-native-actions-sheet";
import BottomPopupSheet from "../components/BottomPopupSheet";
import WheelPicker from "react-native-wheely";
import { widgetTitle } from "../utils";
import { interactive } from "../styles/Interactive";
import { WidgetType } from "../bindings/WidgetType";
import LoadingScreen from "../components/Loading";

const WidgetTypes: WidgetType[] = [
  "Deadlift",
  "Squat",
  "BenchPress",
  "Steps",
  "Weight",
];

const StatsScreen = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [chosenIdx, setChosenIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();

  const widgetSelector = useRef<ActionSheetRef>(null);

  useEffect(() => {
    setLoading(true);
    async function getWidgets() {
      const res = await fetch(`${URI}/users/stats/${authUser}`).catch();
      if (res.ok) {
        const data = (await res.json()) as Widget[];
        setWidgets(data);
        setLoading(false);
      }
    }
    getWidgets();
  }, [authUser]);

  // Get all the widgets that the user doesn't already have added
  const addWidgetTypes = WidgetTypes.filter(
    (name) => widgets.map((widget) => widget.widget_type).indexOf(name) === -1
  );

  async function addWidget() {
    widgetSelector.current?.hide();
    const widgetType: WidgetType = addWidgetTypes[chosenIdx];
    try {
      const res = await fetch(URI + "/users/addWidget/" + widgetType, {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const newWidget: Widget = await res.json();
      setWidgets(widgets.concat(newWidget));
    } catch (_) {}
  }

  function renderWidgets(info) {
    if (info.item === "add") {
      return (
        <TouchableOpacity
          onPress={() => widgetSelector.current?.show()}
          key="add"
        >
          <LinearGradient
            style={styles.add}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[PrimaryGold, "orange"]}
          >
            <Ionicons name="add-outline" size={50} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <GraphWidget
        widgetType={info.item.widget_type}
        initialEntries={info.item.entries}
        key={info.item.widget_type}
      />
    );
  }

  const data = (widgets as (Widget | string)[]).concat("add");

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderWidgets}
        keyExtractor={(item) => {
          if (item === "add") {
            return item;
          } else {
            return (item as Widget).widget_type;
          }
        }}
        showsVerticalScrollIndicator={false}
      />
      <BottomPopupSheet title="Add New Widget" ref={widgetSelector}>
        <>
          <WheelPicker
            selectedIndex={0}
            options={addWidgetTypes.map((w) => widgetTitle(w))}
            onChange={(i) => setChosenIdx(i)}
          />
          <TouchableOpacity style={styles.button} onPress={addWidget}>
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
        </>
      </BottomPopupSheet>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
  add: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 150,
  },
  button: {
    ...interactive.primaryButton,
    top: "-10%",
    marginBottom: 20,
    alignSelf: "center",
    width: "50%",
  },
});
