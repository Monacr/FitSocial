import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontLoader from "./src/components/FontLoader";
import LoginScreen from "./src/screens/LoginScreen";
import { Text, View } from 'react-native';
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import UploadScreen from "./src/screens/UploadScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ScreenStack = createNativeStackNavigator();



const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Upload" component={UploadScreen}/>
      <Tab.Screen name="Settings" component={SettingScreen}/>
    </Tab.Navigator>
  );
}

const Navigator = () => {
  return (
    <FontLoader>
      <NavigationContainer >
          <ScreenStack.Navigator   screenOptions={{ headerShown: false }}>
            <ScreenStack.Screen name="Login" component={LoginScreen} />
            <ScreenStack.Screen name="SignUp" component={SignUpScreen} />
            <ScreenStack.Screen name="HomeStack" component={HomeStack} />
          </ScreenStack.Navigator>
      </NavigationContainer>
    </FontLoader>
  );
};

export default Navigator;
