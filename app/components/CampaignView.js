import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Share,
} from "react-native";
import firebase from "firebase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Cards from "./Cards";
import * as Progress from "react-native-progress";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import * as Icon from "react-native-feather";
import metrics from "../Metrics";
import ReadMore from "react-native-read-more-text";
import FeedPosts from "./FeedPost";

const Separator = () => <View style={styles.separator} />;

export default function CampaignView({ route, navigation }) {
  const { campaign } = route.params;
  const [campaignHeader, setCampaignHeader] = useState();
  const [campaignOwner, setCampaignOwner] = useState({});
  const [allMembers, setallMembers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const userCount = campaign.users.length;
  var fireStore = firebase.storage();
  var progress = campaign.progress / campaign.goal;

  useEffect(() => {
    const getAllPosts = async (posts) => {
      var tempAllPost = [];
      for (const post of posts) {
        const tempPost = await post.get();
        if (!tempPost.exists) {
          console.log("No Post Found");
        } else {
          tempAllPost.push(tempPost.data());
        }
      }
      setAllPosts(tempAllPost);
    };
    const getAllUsers = async (users) => {
      var tempAllUser = [];
      for (const user of users) {
        const tempUser = await user.get();
        if (!tempUser.exists) {
          console.log("No User Found");
        } else {
          tempAllUser.push(tempUser.data());
        }
      }
      setallMembers(tempAllUser);
    };
    const getCampaignHeader = (assets_locator) => {
      const url =
        "gs://logical-handler-247416.appspot.com/campaignAssets/" +
        assets_locator +
        "/header_image.jpg";
      fireStore
        .refFromURL(url)
        .getDownloadURL()
        .then((imageUrl) => {
          setCampaignHeader(imageUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getOwnerData = async (campaignOwner) => {
      const uniqueUser = await campaignOwner.get();
      if (!uniqueUser.exists) {
        console.log("No User Found");
      } else {
        setCampaignOwner(uniqueUser.data());
      }
    };
    getAllPosts(campaign.posts);
    getAllUsers(campaign.users);
    getOwnerData(campaign.owner);
    getCampaignHeader(campaign.assets_locator);
  }, []);

  const _renderItem = ({ item }) => {
    return <FeedPosts content={item} />;
  };
  let _keyExtractor = (item, index) => item.post_id;

  let onClickBack = () => {
    navigation.navigate("CampaignsScreen");
  };
  let _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: "#8E8E92", marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  let _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: "#8E8E92", marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  let _handleTextReady = () => {
    // ...
  };
  let onPressInvite = async () => {
    let message =
      "Here is a cool opportunity for you to try. Join " +
      campaignOwner.first_name +
      "'s " +
      campaign.name +
      " Campaign.";
    try {
      const result = await Share.share({ message });
    } catch (e) {}
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.campaignPicture}>
          <ImageBackground
            source={{ uri: campaignHeader }}
            style={{ width: metrics.screenWidth, height: 176 }}
          >
            <TouchableOpacity onPress={onClickBack}>
              <Icon.ChevronLeft stroke={"#fff"} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.campaignHeader}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.campaignName}>{campaign.name} Campaign</Text>
          </View>

          <View style={styles.progress}>
            <View style={styles.progressBar}>
              <Progress.Bar
                progress={progress}
                width={metrics.screenWidth * 0.6}
                color={"#25D366"}
                height={20}
                borderRadius={25}
                animated={true}
                unfilledColor={"#CFEFE4"}
              />
              <Text>
                {campaign.progress} posts contributed of {campaign.goal} goal
              </Text>
            </View>
            <View style={{ justifyContent: "center" }}></View>
            <TouchableOpacity style={styles.button}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                Contribute
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: metrics.whiteColor }}>
          <Separator />
        </View>

        <View style={styles.campaignBlurb}>
          <View style={styles.campaignOwnerInformation}>
            <View>
              <Image
                source={{ uri: campaignOwner.profile_pic }}
                style={{ width: 48, height: 48, borderRadius: 50 }}
              />
            </View>
            <View style={{ paddingLeft: 5, justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {campaignOwner.first_name + " " + campaignOwner.last_name}
              </Text>
              <Text style={{ fontSize: 12, color: "#838392" }}>
                {campaignOwner.location}
              </Text>
            </View>
          </View>
          <View>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
              onReady={_handleTextReady}
            >
              <Text style={{ paddingLeft: 10 }}>{campaign.blurb}</Text>
            </ReadMore>
          </View>
        </View>
        <View style={{ backgroundColor: metrics.whiteColor }}>
          <Separator />
        </View>
        <View style={styles.invitations}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {userCount + 7} Members
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../images/Profiles.png")}
              style={{ width: 270 }}
            />
            <TouchableOpacity style={styles.button} onPress={onPressInvite}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "white" }}
              >
                + Invite
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postFeed}>
            <FlatList
              data={allPosts}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: metrics.screenHeight,
    // backgroundColor: "#fff",
  },
  campaignHeader: {
    alignItems: "flex-start",
    backgroundColor: metrics.whiteColor,
  },
  campaignName: {
    fontWeight: "bold",
    fontSize: 24,
  },
  progress: {
    flexDirection: "row",
  },
  progressBar: {
    alignItems: "flex-start",
    flexDirection: "column",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: metrics.whiteColor,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34B7F1",
    padding: 10,
    borderRadius: 50,
    width: 110,
    height: 40,
  },
  campaignOwnerInformation: {
    flexDirection: "row",
    backgroundColor: metrics.whiteColor,
  },
  campaignBlurb: {
    paddingLeft: 10,
    backgroundColor: metrics.whiteColor,
  },
  invitations: {
    paddingLeft: 10,
    backgroundColor: metrics.whiteColor,
    height: 70,
    paddingBottom: 10,
  },
  postFeed: {
    paddingTop: 10,
    height: 350,
  },
});
