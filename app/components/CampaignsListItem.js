import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase";
import firestore from "../firebase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import Cards from "./Cards";
import * as Progress from "react-native-progress";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import * as Icon from "react-native-feather";
import metrics from "../Metrics";

export default function CampaignListItem({
  campaign,
  onCampaignPressed,
  navigation,
}) {
  const [oneUser, setOneUser] = useState({});
  const userCount = campaign.users.length - 1;
  const progress = campaign.progress / campaign.goal;

  useEffect(() => {
    const getUserData = async (user) => {
      const uniqueUser = await user.get();
      if (!uniqueUser.exists) {
        console.log("No User Found");
      } else {
        setOneUser(uniqueUser.data());
      }
    };
    getUserData(campaign.users[0]);
  }, []);

  const campaignPressed = () => {
    onCampaignPressed(campaign);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageHolder}>
        <Image
          source={{ uri: campaign.picture }}
          style={styles.campaignImage}
        />
      </View>
      <View style={styles.textInfo}>
        <View>
          <TouchableOpacity onPress={campaignPressed}>
            <Text
              style={{
                fontFamily: metrics.fontFamily,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {campaign.name}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: oneUser.profile_pic }}
              style={{ width: 16, height: 16, borderRadius: 50 }}
            />
            <Text
              style={{
                paddingLeft: 5,
                fontFamily: metrics.fontFamily,
                fontSize: 14,
                fontWeight: "bold",
                color: "#8e8e92",
              }}
            >
              {oneUser.first_name}
            </Text>
            <Text
              style={{
                paddingLeft: 5,
                fontFamily: metrics.fontFamily,
                fontSize: 14,
                color: "#8e8e92",
              }}
            >
              {"and " + userCount + " others have joined so far"}
            </Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Progress.Bar
              progress={progress}
              width={null}
              color={"#25D366"}
              height={10}
              borderRadius={6}
              animated={true}
              unfilledColor={"#CFEFE4"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: metrics.screenWidth,
    height: 104,
    backgroundColor: metrics.whiteColor,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  campaignImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  imageHolder: {
    justifyContent: "center",
  },
  textInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 8.5,
    borderBottomWidth: 1,
    borderBottomColor: "#8E8E92",
    width: "75%",
  },
});
