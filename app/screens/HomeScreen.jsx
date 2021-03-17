import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import navigation screens
import Feed from "../components/Feed";
import ViewPost from "../components/ViewPost";
// import auxiliary classes
import Metrics from '../Metrics';
import Images from '../Images';

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {

  const renderLogoHeader = () => {
    return (
      <Image style={styles.logoBanner} source={Images.logo} />
    );
  };

  const renderViewPostHeader = () => {
    return (
      <Text style={styles.headerTitle}>View Post</Text>
    );
  };

  return (
    <Stack.Navigator initialRouteName="HomeFeed">
      <Stack.Screen
        name="HomeFeed"
        component={Feed}
        options={{
          headerTitle: renderLogoHeader,
          headerTintColor: Metrics.blackColor,
        }}
      />
      <Stack.Screen 
        name="ViewPost"
        component={ViewPost}
        options={{
          headerTitle: renderViewPostHeader, 
          headerBackTitleVisible: false, 
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
  headerTitle: {
    fontSize: 24,
    fontWeight: Metrics.fontWeightMedium,
  },
});