import * as Font from "expo-font";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";

const FontLoader = (props: React.PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync({
        "Roboto-Medium": Roboto_500Medium,
      });
      setLoading(false);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {props.children}
    </View>
  );
};

export default FontLoader;
