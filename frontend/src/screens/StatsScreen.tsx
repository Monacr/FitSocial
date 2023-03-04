import { StyleSheet, FlatList } from "react-native";
import { WidgetType } from "../bindings/WidgetType";
import GraphWidget, { Timeframe } from "./widgets/GraphWidget";
import { Date } from "../bindings/Date";

const data = [
  { title: "Weight", timeframe: Timeframe.Week },
  { title: "Squat", timeframe: Timeframe.All },
  {
    title: "Deadlift",
    timeframe: Timeframe.Month,
  },
];

const StatsScreen = ({ navigation }) => {
  function renderWidgets(info) {
    return <GraphWidget widget_type={info.item.title} />;
  }
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
