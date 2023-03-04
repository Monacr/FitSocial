import { LineChart } from "react-native-chart-kit";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { PrimaryBlue, PrimaryGold, URI } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useRef, useEffect } from "react";
import WheelPicker from "react-native-wheely";
import { ActionSheetRef } from "react-native-actions-sheet";
import BottomPopupsheet from "../../components/BottomPopupSheet";
import WidgetEntry from "../../components/WidgetEntry";
import { WidgetType } from "../../bindings/WidgetType";
import { cmpDate, widgetTitle } from "../../utils";
import { Date } from "../../bindings/Date";
import { useAuth } from "../../components/AuthProvider";
import { Widget } from "../../bindings/Widget";

/**
 * Timeframe to display on the graph in days
 **/
export enum Timeframe {
  Week = 7,
  Month = 30,
  TwoMonth = 61,
  SixMonth = 182,
  Year = 365,
  All,
}

const TimeframeNames = [
  "Week",
  "Month",
  "Two Months",
  "Six Months",
  "Year",
  "All",
];

type PropsType = {
  widget_type: WidgetType;
};

const GraphWidget = ({ widget_type }: PropsType) => {
  // Load from storage
  const startTimeframeIndex = 0;
  const title = widgetTitle(widget_type);

  const { authUser } = useAuth();
  const [timeframe, setTimeframe] = useState(Timeframe.Week);
  const [entries, setEntries] = useState<[Date, number][]>([]);

  const timeframeSelector = useRef<ActionSheetRef>(null);
  const entrySelector = useRef<ActionSheetRef>(null);

  useEffect(() => {
    getEntries();
  }, []);

  async function getEntries() {
    const res = await fetch(`${URI}/users/${authUser}/stats/${widget_type}`);
    if (res.ok) {
      const data = (await res.json()) as Widget;
      setEntries(data.entries);
    }
  }

  function getData(): number[] {
    // Sort by date
    const data = entries
      .sort(([d1, _], [d2, __]) => cmpDate(d1, d2))
      .map(([_, n], __) => n);

    if (data.length == 0) {
      return [0];
    }
    if (timeframe === Timeframe.All) {
      return data;
    }

    return data.slice(Math.max(0, data.length - timeframe));
  }

  function getLabels(): string[] {
    // Get stuff in the timeframe:
    let truncated = entries.sort(([d1, _], [d2, __]) => cmpDate(d1, d2));
    if (timeframe !== Timeframe.All) {
      truncated = truncated.slice(Math.max(0, truncated.length - timeframe));
    }

    const labels = truncated.map(([d, _], __) => `${d.month}/${d.day}`);

    // Select 7 dates, including first and last
    const toSelect = new Set();
    for (let i = 0; i < 8; i++) {
      toSelect.add(Math.floor((i / 7.0) * (labels.length - 1)));
    }
    return labels.filter((_, i) => toSelect.has(i));
  }

  function updateTimeframe(i: number) {
    setTimeframe(Timeframe[TimeframeNames[i]]);
  }

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 1.4, y: 0 }}
      colors={[PrimaryBlue, PrimaryGold]}
    >
      <BottomPopupsheet
        title={"Choose a Timeframe to Display"}
        ref={timeframeSelector}
      >
        <WheelPicker
          selectedIndex={startTimeframeIndex}
          options={TimeframeNames}
          onChange={(index) => updateTimeframe(index)}
        />
      </BottomPopupsheet>
      <BottomPopupsheet
        ref={entrySelector}
        title={"Add New " + title + " Entry"}
      >
        <WidgetEntry
          widget_type={widget_type}
          updateEntryCallback={getEntries}
          ref={entrySelector}
        />
      </BottomPopupsheet>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              entrySelector.current?.show();
            }}
          >
            <Ionicons name="add-outline" size={30} style={styles.add} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              timeframeSelector.current?.show();
            }}
          >
            <Ionicons
              name="ellipsis-vertical-outline"
              size={30}
              style={styles.timeSelector}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={{
          labels: getLabels(),
          datasets: [
            {
              data: getData(),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={180}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={styles.graph}
        withVerticalLines={false}
        withDots={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 12,
    borderRadius: 10,
    padding: 10,
  },
  topRow: {
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    color: "white",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  buttons: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  add: {
    color: "white",
    top: "-1%",
    marginHorizontal: 10,
  },
  timeSelector: {
    color: "white",
    top: "-1%",
  },
  graph: {},
});

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientFrom: PrimaryBlue,
  backgroundGradientTo: PrimaryGold,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export default GraphWidget;
