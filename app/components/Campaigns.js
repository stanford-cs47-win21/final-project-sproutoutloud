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
import metrics from "../Metrics";
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
      <View style={styles.topText}>
        <Text style={styles.joinedCampaigns}>Joined Campaigns</Text>
      </View>
      {loading ? (<ActivityIndicator size="large" color={metrics.greenColor} />):(
        <KeyboardAwareFlatList 
        data={allCampaigns} 
        renderItem={renderItem} 
        keyExtractor={_keyExtractor}
        refreshControl={<RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor={metrics.greenColor} 
        />}
        extraScrollHeight={-48}
        directionalLockEnabled={true}
      />
      )}
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
  joinedCampaigns: {
    fontSize: 28,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: "#000000",
    fontWeight: "bold",
    fontFamily: metrics.fontFamily,
  },
});
