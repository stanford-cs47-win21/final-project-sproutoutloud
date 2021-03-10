import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import navigation screens
import HomeFeed from "./app/screens/HomeFeed";
import LocalOpps from "./app/screens/LocalOpps";
// import auxiliary classes
import Metrics from './app/Metrics';
import Images from './app/Images';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === "Home") {
              icon = focused ? Images.home_tab_active : Images.home_tab_inactive;
            } else if (route.name === "Map") {
              icon = focused ? Images.map_tab_active : Images.map_tab_inactive;
            }
            return <Image source={icon} style={styles.tabIcon} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: Metrics.greenColor,
          inactiveTintColor: Metrics.blackColor,
          tabStyle: {paddingTop: 6}
        }}        
      >
        <Tab.Screen name="Home" component={HomeFeed} />
        <Tab.Screen name="Map" component={LocalOpps} />
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 32,
    height: 32, 
    resizeMode: 'contain',
  },
});