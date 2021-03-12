import { useScrollToTop } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet, Text, View, Image, TabBarIOS } from 'react-native';
import Feed from '../components/Feed';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {

  let onPostRequested = (post) => {
    console.log(post)
  }

  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="float">
      <Stack.Screen name="HomeScreen" options={{ headerTitle: props => <Image source={require("../images/logo.png")}/>}}>
        {(props) => <Feed {...props} onPostRequested={onPostRequested}/>}
      </Stack.Screen>
      {/* <Stack.Screen name="PostScreen" component={}/> */}
    </Stack.Navigator>
  );
}