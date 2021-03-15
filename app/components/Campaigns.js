import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import firestore from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import CampaignsListItem from "./CampaignsListItem";
import metrics from "../Metrics";

export default function Campaigns({
  contents,
  onCampaignRequested,
  navigation,
}) {
  const [loading, setLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);

  async function getCampaigns() {
    const allCampaigns = await firestore.collection("campaigns").get();
    return allCampaigns.docs.map((doc) => doc.data());
  }

  let _keyExtractor = (item, index) => item.post_id;

  let onCampaignPressed = (campaign) => {
    onCampaignRequested(campaign);
  };

  let renderItem = ({ item }) => {
    return (
      <CampaignsListItem
        campaign={item}
        onCampaignPressed={() => onCampaignPressed(item)}
      />
    );
  };

  useEffect(() => {
    if (contents) {
      setAllCampaigns(contents);
    } else {
      getAllCampaigns();
    }
  }, [contents]);

  let getAllCampaigns = () => {
    setLoading(true);
    var campaigns = getCampaigns();
    campaigns.then((data) => {
      setAllCampaigns(data);
      setLoading(false);
    });
  };

  function displayedContents() {
    let content = null;
    if (loading) {
      content = <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      content = (
        <FlatList
          data={allCampaigns}
          renderItem={renderItem}
          keyExtractor={_keyExtractor}
        />
      );
    }
    return content;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topText}>
        <Text
          style={{
            fontSize: 28,
            alignSelf: "flex-start",
            justifyContent: "flex-start",
            color: "#000000",
            fontWeight: "bold",
            fontFamily: metrics.fontFamily,
          }}
        >
          Joined Campaigns
        </Text>
      </View>
      {displayedContents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  topText: {
    paddingLeft: 8,
  },
});
