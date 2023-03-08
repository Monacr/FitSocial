import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontLoader from "./src/components/FontLoader";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import {
  AuthProvider,
  useIsAuthenticated,
} from "./src/components/AuthProvider";
import HomeStack from "./src/components/HomeStack";
import { SheetProvider } from "react-native-actions-sheet";

const ScreenStack = createNativeStackNavigator();
const Navigator = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <NavigationContainer>
      <ScreenStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated && (
          <ScreenStack.Screen name="Login" component={LoginScreen} />
        )}
        {!isAuthenticated && (
          <ScreenStack.Screen name="SignUp" component={SignUpScreen} />
        )}
        <ScreenStack.Screen name="HomeStack" component={HomeStack} />
      </ScreenStack.Navigator>
    </NavigationContainer>
  );
};

const Root = () => {
  return (
    <FontLoader>
      <SheetProvider>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </SheetProvider>
    </FontLoader>
  );
};

export default Root;
