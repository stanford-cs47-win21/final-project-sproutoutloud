import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import "firebase/firebase-storage";
import firebase from "firebase";
import firestore from "../firebase";
import Metrics from "../Metrics";

const parsePostsFromDatabase = (postsFromDatabase, collectionPath) => {
  const parsedPosts = [];
  postsFromDatabase.forEach((post) => {
    const postData = post.data();
    postData["id"] = post.id;
    parsedPosts.push(postData);
  });
  return parsedPosts;
};

export default function ConfirmContribution({ route, navigation }) {
  const { campaign, uri, contributor, campaignOwner } = route.params;
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = firebase.storage();
  const getAllPosts = async () => {
    const collRef = firestore.collection("posts");
    const postsFromDatabase = await collRef.get();
    const posts = parsePostsFromDatabase(postsFromDatabase, "posts");
    setAllPosts(posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const splitURI = uri.split("/");
  const filename = splitURI[8];
  const path = "/campaignAssets/" + campaign.assets_locator;
  var storageRef = firebase.storage().ref(path);
  const ref = storageRef.child(`${filename}`);

  const getImageUrl = (assets_locator, filename) => {
    const url =
      "gs://logical-handler-247416.appspot.com/campaignAssets/" +
      assets_locator +
      "/" +
      filename;

    storage
      .refFromURL(url)
      .getDownloadURL()
      .then((imageUrl) => {
        const newlength = allPosts.length + 1;
        const newId = "post" + newlength;

        const post = {
          campaign:
            campaignOwner.first_name + "'s " + campaign.name + " Campaign",
          campaign_picture: campaign.picture,
          comment_count: 0,
          comments: [],
          content_picture: imageUrl,
          current_status: campaign.progress + 1,
          goal: campaign.goal,
          likes: 0,
          post_id: newId,
          time: new Date(),
          user: firestore.collection("users").doc(contributor.user_id),
        };

        firestore
          .collection("posts")
          .doc(newId)
          .set(post)
          .then(() => {
            console.log("Posts successfully written!");
            // navigation.navigate("CampaignsScreen");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        campaign.posts.push(firestore.collection("posts").doc(newId));

        firestore
          .collection("campaigns")
          .doc(campaign.id)
          .set(
            { posts: campaign.posts, progress: campaign.progress + 1 },
            { merge: true }
          )
          .then(() => {
            console.log("Campaign successfully updated!");
            navigation.navigate("CampaignView");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let onPress = () => {
    setLoading(true);
    fetch(uri)
      .then((response) => response.blob())
      .then((blob) => {
        ref.put(blob).then((snapshot) => {
          getImageUrl(campaign.assets_locator, filename);
        });
      })
      .catch((error) => {
        console.log("Error My Guy!", error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text}>Uploading post...</Text>
          <Text style={styles.text}>This may take a few minutes - be patient :)</Text>
          <ActivityIndicator style={{marginVertical: 12}} size='large' color={Metrics.greenColor} />
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 8, textAlign: 'center' }}>
            {`Confirm your contribution to:\n${campaignOwner.first_name + "'s " + campaign.name + " Campaign"}`}
          </Text>
          <Image source={{ uri: uri }} style={{ width: 400, height: 400 }} />
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text
                style={{
                  fontFamily: Metrics.fontFamily,
                  fontWeight: 'bold',
                  color: Metrics.whiteColor,
                  letterSpacing: 0.3,
                  fontSize: 18,
                }}
              >
                Let's post it!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34B7F1",
    borderRadius: 50,
    height: 48,
    width: 240,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: Metrics.fontWeightMedium,
    color: "black",
    textAlign: "center",
  },
});
