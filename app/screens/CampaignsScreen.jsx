import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Campaigns from "../components/Campaigns";
import { createStackNavigator } from "@react-navigation/stack";
import CampaignView from "../components/CampaignView";
import Contribute from "../components/Contribute";
import ConfirmContribution from "../components/ConfirmContribution";

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

  const renderContributeHeader = () => {
    return (
      <Text style={styles.headerTitle}>Make a Contribution</Text>
    );
  };

  const renderConfirmHeader = () => {
    return (
      <Text style={styles.headerTitle}>Post Preview</Text>
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
      <Stack.Screen name={"Contribute"} 
        options={{ 
          headerTitle: renderContributeHeader, 
          headerBackTitleVisible: false, 
          headerTintColor: Metrics.blackColor,
        }}
      >
        {(props) => <Contribute {...props} />}
      </Stack.Screen>
      <Stack.Screen name={"ConfirmContribution"} 
        options={{ 
          headerTitle: renderConfirmHeader, 
          headerBackTitleVisible: false, 
          headerTintColor: Metrics.blackColor,
        }}
      >
        {(props) => <ConfirmContribution {...props} />}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: Metrics.fontWeightMedium,
  },
});
