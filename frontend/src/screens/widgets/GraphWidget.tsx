import { LineChart } from "react-native-chart-kit";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { PrimaryBlue, PrimaryGold } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

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

const GraphWidget = ({ title, timeframe, data }) => {
  function getData(): number[] {
    if (timeframe === Timeframe.All) {
      return data;
    }

    return data.slice(Math.max(0, data.length - timeframe));
  }

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[PrimaryBlue, PrimaryGold]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="add-outline" size={30} style={styles.add} />
      </View>
      <LineChart
        data={{
          labels: ["January", "February", "April", "May", "June"],
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
  add: {
    alignSelf: "flex-end",
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