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
import PostProgress from "./PostProgress";

export default function CampaignListItem({
  campaign,
  onCampaignPressed,
  navigation,
}) {
  const [oneUser, setOneUser] = useState({});
  const userCount = campaign.users.length + 6;
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
    <TouchableOpacity style={styles.card} onPress={campaignPressed}>
      <View style={styles.imageHolder}>
        <Image
          source={{ uri: campaign.picture }}
          style={styles.campaignImage}
        />
      </View>
      <View style={styles.textInfo}>
        <View>
          <Text
            style={{
              fontFamily: metrics.fontFamily,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {campaign.name}
          </Text>

          <View style={{ flexDirection: "row", paddingTop: 2, }}>
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
              {"and " + userCount + " others have joined"}
            </Text>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Progress.Bar
              progress={progress}
              width={null}
              color={metrics.greenColor}
              height={12}
              borderWidth={0}
              borderRadius={12}
              animated={true}
              unfilledColor={metrics.progressUnfilledColor}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: metrics.screenWidth,
    height: 96,
    backgroundColor: metrics.whiteColor,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  campaignImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  imageHolder: {
    justifyContent: "center",
  },
  textInfo: {
    marginLeft: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#8E8E92",
    width: "75%",
  },
});
