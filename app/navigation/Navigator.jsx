import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import navigation screens
import MainApp from "./MainApp";
import OnboardingFlow from "./OnboardingFlow";
// import auxiliary classes
import Metrics from "../Metrics";
import Images from "../Images";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator 
      	initialRouteName="OnboardingFlow"
      	screenOptions={{ headerShown: false }}
  		>
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}