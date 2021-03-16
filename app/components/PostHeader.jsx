import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Metrics from "../Metrics"

export default function PostHeader({ campaignPic, campaignTitle, posterName, postTime }) {

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const timePosted = new Date(postTime.seconds * 1000);
  const timeSincePosted = timeAgo.format(timePosted, "round");

  return (
    <View style={styles.header}>
      <Image source={{ uri: campaignPic }} style={styles.campaignPic} />
      <View style={styles.details}>
        <Text style={styles.campaignTitle}>{campaignTitle}</Text>
        <View style={styles.postDetails}>
          <Text style={styles.posterText}>{`${posterName} submitted a video`}</Text>
          <Text style={styles.timeText}>{timeSincePosted}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  campaignPic: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 4,
  },
  details: {
    flex: 1,
  },
  campaignTitle: {
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  posterText: {
    fontFamily: Metrics.fontFamily,
    fontSize: 13,
  },
  timeText: {
    fontFamily: Metrics.fontFamily,
    fontSize: 13,
    color: Metrics.darkGrayColor,
  },
});