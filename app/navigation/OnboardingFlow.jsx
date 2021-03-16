import React, { useState } from "react";
import Swiper from "react-native-swiper"
import { StyleSheet, Text, View, Image, } from "react-native";
// import navigation screens
import { Page1, Page2, Page3, Page4, Page5 } from "../screens/OnboardingPages";
// import auxiliary classes
import Metrics from "../Metrics";
import Images from "../Images";

export default function OnboardingFlow({ navigation }) {
  const navigateToMainApp = () => {
    navigation.replace("MainApp");
  }

  return (
    <Swiper 
      loop={false}
      dotColor={Metrics.charcoalColor}
      activeDotColor={Metrics.greenColor}
      activeDotStyle={{ width: 20 }}
      paginationStyle={{ bottom: 48 }}
    >
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 navigateToMainApp={navigateToMainApp} />
    </Swiper>
  );
}