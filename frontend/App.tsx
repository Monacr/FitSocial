import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const ScreenStack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <ScreenStack.Navigator screenOptions={{ headerShown: false }}>
        <ScreenStack.Screen name="Login" component={LoginScreen} />
        <ScreenStack.Screen name="SignUp" component={SignUpScreen} />
      </ScreenStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
