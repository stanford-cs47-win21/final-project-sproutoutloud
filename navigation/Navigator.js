import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Image, TabBarIOS } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

const FeedStack = createStackNavigator();

function feedStackNav() {
    return(
  <FeedStack.Navigator initialRouteName="HomeSCreen" headerMode="float">
    <FeedStack.Screen name="HomeScreen" component={HomeScreen} />
    {/* <FeedStack.Screen name="PostScreen" component={}/> */}
  </FeedStack.Navigator>
  )
}

const NavTab = createBottomTabNavigator();
export default function Navigator() {
  return (
    <NavigationContainer>
      <NavTab.Navigator initialRouteName="Home">
        <NavTab.Screen name="Home" component={feedStackNav} />
        <NavTab.Screen name="Map" component={MapScreen} />
      </NavTab.Navigator>
    </NavigationContainer>
  );
}

