import { StyleSheet, FlatList } from "react-native";
import GraphWidget, { Timeframe } from "./widgets/GraphWidget";

const data = [
  { title: "Weight", timeframe: Timeframe.Week },
  { title: "Squat", timeframe: Timeframe.All },
  {
    title: "Bench",
    timeframe: Timeframe.TwoMonth,
  },
  {
    title: "Deadlift",
    timeframe: Timeframe.Month,
  },
  {
    title: "Miles",
    timeframe: Timeframe.SixMonth,
  },
];

const filler = Array(100)
  .fill(0)
  .map((_) => Math.random() * 400);

const StatsScreen = ({ navigation }) => {
  const renderWidgets = (info) => {
    return <GraphWidget title={info.item.title} data={filler} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderWidgets}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
