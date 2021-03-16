import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Campaigns from "../components/Campaigns";
import { createStackNavigator } from "@react-navigation/stack";
import CampaignView from "../components/CampaignView";
// import auxiliary classes
import Metrics from '../Metrics';
import Images from '../Images';


const Stack = createStackNavigator();

export default function CampaignsList({ navigation }) {
  let onCampaignRequested = (campaign) => {
    console.log("Campaign Requested is:", campaign.name);
    navigation.navigate("CampaignView", { campaign: campaign });
  };

  const renderLogo = () => {
    return (
      <Image style={styles.logoBanner} source={Images.logo} />
    );
  };

  return (
    <Stack.Navigator initialRouteName="CampaignsScreen" headerMode="float">
      <Stack.Screen
        name="CampaignsScreen"
        options={{
          headerTitle: renderLogo,
          headerTintColor: Metrics.blackColor,
        }}
      >
        {(props) => (
          <Campaigns {...props} onCampaignRequested={onCampaignRequested} />
        )}
      </Stack.Screen>
      <Stack.Screen name={"CampaignView"} options={{ headerShown: false }}>
        {(props) => <CampaignView {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  logoBanner: {
    width: Metrics.screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
