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

export default function FeedPosts({ content, onPostRequested }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [user, setUser] = useState({});
  const [value, onChangeText] = useState(" Add a comment...");

  useEffect(() => {
    const getUserData = async (user) => {
      const uniqueUser = await user.get();
      if (!uniqueUser.exists) {
        console.log("No User Found");
      } else {
        setUser(uniqueUser.data());
      }
    };
    getUserData(content.user);
  }, []);

  function onPress(params) {
    console.log(user.first_name);
  }
  const timePosted = new Date(content.time.seconds * 1000);
  var timeSincePosted = timeAgo.format(timePosted, "round");

  var progress = content.current_status / content.goal;

  return (
    <View style={styles.container}>
      <Cards style={styles.postCard}>
        {/* Top Content(Name,and action starts here) */}
        <View style={styles.topContent}>
          <View style={styles.campaignImageContainer}>
            <Image
              source={{ uri: content.campaign_picture }}
              style={styles.campaignPicture}
            />
          </View>
          <View style={styles.topTextContainer}>
            <Text>{content.campaign}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                {user.first_name +
                  " " +
                  user.last_name +
                  " " +
                  "submitted an image"}
              </Text>

              <Text
                style={{
                  paddingLeft: 5,
                  color: "#8E8E92",
                  alignSelf: "flex-end",
                }}
              >
                {timeSincePosted}
              </Text>
            </View>
          </View>
        </View>
        {/* Post contents start here (mr beast picture/others) */}
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: content.content_picture }}
            style={styles.contentPicture}
          />
          <View
            style={{
              paddingTop: 10,
              width: "100%",
              height: 25.4,
              color: "#075E54",
            }}
          >
            <Progress.Bar
              progress={progress}
              width={null}
              color={"#25D366"}
              height={10}
              borderRadius={6}
              animated={true}
            />
            <Text style={{ alignSelf: "flex-end" }}>
              {content.current_status.toString() +
                "/" +
                content.goal.toString() +
                " posts"}
            </Text>
          </View>
        </View>
        {/* Like comment share  */}
        <View style={styles.userActionContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.circle}>
              <Icon.ThumbsUp
                stroke={"#8E8E92"}
                style={{ alignSelf: "center" }}
              />
            </View>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text>{content.likes}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.circle}>
              <Icon.MessageCircle
                stroke={"#8E8E92"}
                style={{ alignSelf: "center" }}
              />
            </View>
            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text>{content.comment_count}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.circle}>
              <Icon.Upload stroke={"#8E8E92"} style={{ alignSelf: "center" }} />
            </View>
          </View>
        </View>

        {/* Comment field starts here */}

        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <View>
            {content.comment_count > 1 ? (
              <Text>View all {content.comment_count} comments</Text>
            ) : (
              <Text>View {content.comment_count} comment</Text>
            )}
          </View>

          <View style={styles.commentField}>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: user.profile_pic }}
                style={{
                  height: 34.24,
                  width: 33.86,
                  borderRadius: 50,
                  alignSelf: "flex-start",
                }}
              />
            </View>
            <View
              style={{
                flex: 8.5,
                backgroundColor: "#F4F4F5",
                borderRadius: 16,
                alignSelf: "stretch",
              }}
            >
              <TextInput
                style={{
                  height: 33.86,
                  width: "100%",
                  borderColor: "#c4c4c4",
                  borderWidth: 0.25,
                  borderRadius: 16,
                }}
                // onChangeText={text => onChangeText(text)}
                value={value}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                height: 33.86,
              }}
            >
              <Icon.Send
                stroke={"#8E8E92"}
                height={33.86}
                style={{
                  transform: [{ rotate: "45deg" }],
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
        </View>
      </Cards>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  topContent: {
    flexDirection: "row",
    width: "100%",
  },
  campaignImageContainer: {
    paddingRight: 5,
  },
  campaignPicture: {
    width: 42.8,
    height: 42.33,
    flex: 1,
  },
  topTextContainer: {
    flexDirection: "column",
    alignContent: "flex-end",
    flex: 3,
  },
  contentContainer: {
    paddingBottom: 10,
    flexDirection: "column",
    paddingTop: 10,
  },
  contentPicture: {
    width: "100%",
    height: 135.46,
  },
  userActionContainer: {
    width: "100%",
    height: 42.33,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    width: 42.8,
    height: 42.8,
    borderRadius: 50,
    backgroundColor: "#F4F4F5",
    justifyContent: "center",
  },
  commentField: {
    width: "100%",
    flexDirection: "row",
  },
});
