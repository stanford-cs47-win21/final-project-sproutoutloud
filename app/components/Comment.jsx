import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import db from "../firebase";
import Metrics from "../Metrics";

export default function Comment({ content, time, posterId }) {
  const [poster, setPoster] = useState({});

  const loadPosterData = async (posterId) => {
    const posterRef = db.collection("users").doc(posterId);
    const posterFromDatabase = await posterRef.get();
    const poster = posterFromDatabase.data();
    setPoster(poster);
  };

  useEffect(() => {
    loadPosterData(posterId);
  }, []);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const timePosted = new Date(time.seconds * 1000);
  const timeSincePosted = timeAgo.format(timePosted, "round");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: poster.profile_pic }} style={styles.profilePic} />
        <View style={styles.details} >
          <Text style={styles.userName}>{`${poster.first_name} ${poster.last_name}`}</Text>
          <Text style={styles.timeText}>{timeSincePosted}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Metrics.userInputColor,
    width: '100%',
    padding: 8,
    borderRadius: 16,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePic: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
    marginRight: 3,
    borderRadius: 32,
    backgroundColor: Metrics.progressUnfilledColor,
  },
  details: {
    marginLeft: 4,
  },
  userName : {
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontFamily: Metrics.fontFamily,
    fontSize: 13,
    color: Metrics.darkGrayColor,
  },
  comment: {
    marginLeft: 8,
    fontFamily: Metrics.fontFamily,
    fontSize: 15,
  },
});