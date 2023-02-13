import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontLoader from "./src/components/FontLoader";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";

const ScreenStack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <FontLoader>
      <NavigationContainer>
        <ScreenStack.Navigator screenOptions={{ headerShown: false }}>
          <ScreenStack.Screen name="Login" component={LoginScreen} />
          <ScreenStack.Screen name="SignUp" component={SignUpScreen} />
          <ScreenStack.Screen name="Home" component={HomeScreen} />
        </ScreenStack.Navigator>
      </NavigationContainer>
    </FontLoader>
  );
};

export default Navigator;
