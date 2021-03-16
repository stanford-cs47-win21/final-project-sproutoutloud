import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import navigation screens
import Feed from "../components/Feed";
// import auxiliary classes
import Metrics from '../Metrics';
import Images from '../Images';

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {

  const renderLogo = () => {
    return (
      <Image style={styles.logoBanner} source={Images.logo} />
    );
  };

  return (
    <Stack.Navigator initialRouteName="HomeFeed">
      <Stack.Screen
        name="HomeFeed"
        component={Feed}
        options={{
          headerTitle: renderLogo,
          headerTintColor: Metrics.blackColor,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoBanner: {
    width: Metrics.screenWidth * 0.7,
    resizeMode: 'contain',
  },
});