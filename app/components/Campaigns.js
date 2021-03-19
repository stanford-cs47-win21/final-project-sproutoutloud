import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import firebase from "firebase";
import firestore from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import CampaignsListItem from "./CampaignsListItem";
import Metrics from "../Metrics";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

export default function Campaigns({
  contents,
  onCampaignRequested,
  navigation,
}) {
  const [loading, setLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getCampaigns() {
    const allPosts = await firestore.collection("campaigns").get();
    return allPosts.docs.map((doc) => doc.data());
  }

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
  }, [refreshing]);

  let getAllCampaigns = () => {
    setLoading(true);
    var campaigns = getCampaigns();
    campaigns.then((data) => {
      setAllCampaigns(data);
      setLoading(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllCampaigns();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      { loading ? (
        <ActivityIndicator size='large' color={Metrics.greenColor} />
      ) : (
        <View style={styles.listView}>
          <Text style={styles.joinedCampaigns}>Joined Campaigns</Text>
          <KeyboardAwareFlatList 
            data={allCampaigns} 
            renderItem={renderItem} 
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor={Metrics.greenColor} 
            />}
            extraScrollHeight={-48}
            directionalLockEnabled={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Metrics.whiteColor,
  },
  listView: {
    marginLeft: 8,
  },
  joinedCampaigns: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: Metrics.fontFamily,
  },
});
