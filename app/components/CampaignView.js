import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  Share,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";
import * as Progress from "react-native-progress";
import * as Icon from "react-native-feather";
import metrics from "../Metrics";
import ReadMore from "react-native-read-more-text";
import FeedPosts from "./FeedPost";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Separator = () => <View style={styles.separator} />;

export default function CampaignView({ route, navigation }) {
  const { campaign } = route.params;
  const [campaignHeader, setCampaignHeader] = useState();
  const [campaignOwner, setCampaignOwner] = useState({});
  const [allMembers, setallMembers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const userCount = campaign.users.length;
  var fireStore = firebase.storage();
  var progress = campaign.progress / campaign.goal;

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
      "/header_image.png";
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

  useEffect(() => {
    getAllPosts(campaign.posts);
    getAllUsers(campaign.users);
    getOwnerData(campaign.owner);
    getCampaignHeader(campaign.assets_locator);
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    getAllPosts(campaign.posts);
    setRefreshing(false);
  };

  const _renderItem = ({ item }) => {
    return <FeedPosts content={item} navigation={navigation} />;
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
      "Sprout Out Loud: Join " +
      campaignOwner.first_name +
      "'s " +
      campaign.name +
      " Campaign!";
    try {
      const result = await Share.share({ message });
    } catch (e) {}
  };

  let onPressContribute = () => {
    navigation.navigate("Contribute",{campaign:campaign,campaignOwner:campaignOwner})
  }
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.campaignPicture}>
        <ImageBackground
          source={{ uri: campaignHeader }}
          style={{ width: metrics.screenWidth, height: 176 }}
        >
          <TouchableOpacity style={{position: 'absolute', top: 20}} onPress={onClickBack}>
            <Icon.ChevronLeft stroke={"#fff"} width={40} height={40}/>
          </TouchableOpacity>
          <Icon.PlayCircle 
            style={{position: 'absolute', left: (metrics.screenWidth * 0.5) - 30, top: 58}}
            width={60}
            height={60} 
            stroke={metrics.whiteColor} 
            strokeWidth={1}
            fill={'rgba(52, 52, 52, 0.75)'}
          />
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
              width={metrics.screenWidth * 0.63}
              color={"#25D366"}
              height={18}
              borderWidth={0}
              borderRadius={18}
              animated={true}
              unfilledColor={"#CFEFE4"}
            />
            <Text>{campaign.progress} posts contributed of {campaign.goal} post goal</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressContribute}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
            >
              {"Contribute"}
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
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <Image
            source={require("../images/Profiles.png")}
            style={{ width: metrics.screenWidth * 0.7, height: metrics.screenWidth * 0.14, marginLeft: -4, resizeMode: 'contain', }}
          />
          <TouchableOpacity style={styles.button} onPress={onPressInvite}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
            >
              {"+ Invite"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {allPosts.map((item, idx) => (
          <FeedPosts key={idx} content={item} navigation={navigation} />
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  campaignHeader: {
    alignItems: "flex-start",
    backgroundColor: metrics.whiteColor,
    paddingBottom: 4,
  },
  campaignName: {
    fontWeight: "bold",
    fontSize: 28,
    marginVertical: 4,
  },
  progress: {
    flexDirection: "row",
    alignItems: 'flex-start',
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  progressBar: {
    alignItems: "flex-start",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
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
    width: 104,
    height: 36,
  },
  campaignOwnerInformation: {
    flexDirection: "row",
    backgroundColor: metrics.whiteColor,
  },
  campaignBlurb: {
    paddingLeft: 10,
    paddingVertical: 8,
    backgroundColor: metrics.whiteColor,
  },
  invitations: {
    paddingLeft: 8,
    paddingVertical: 4,
    backgroundColor: metrics.whiteColor,
  },

});
