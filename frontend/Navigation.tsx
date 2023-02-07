import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";

const ScreenStack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <ScreenStack.Navigator screenOptions={{headerShown: false}}>
            <ScreenStack.Screen name ="Login" component = {LoginScreen}/>
            <ScreenStack.Screen name ="SignUp" component = {SignUpScreen}/>
        </ScreenStack.Navigator>
    )
}