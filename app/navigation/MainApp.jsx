import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import navigation screens
import Campaigns from "../screens/CampaignsScreen";
import HomeScreen from "../screens/HomeScreen";
import LocalOpps from "../screens/LocalOpps";
// import auxiliary classes
import Metrics from "../Metrics";
import Images from "../Images";

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Home") {
            icon = focused
              ? Images.home_tab_active
              : Images.home_tab_inactive;
          } else if (route.name === "Map") {
            icon = focused 
              ? Images.map_tab_active 
              : Images.map_tab_inactive;
          } else if (route.name === "Campaigns") {
            icon = focused
              ? Images.campaign_tab_active
              : Images.campaign_tab_inactive;
          }
          return <Image source={icon} style={styles.tabIcon} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Metrics.greenColor,
        inactiveTintColor: Metrics.blackColor,
        tabStyle: { paddingTop: 6 },
      }}
    >
      <Tab.Screen name="Campaigns" component={Campaigns} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={LocalOpps} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});
