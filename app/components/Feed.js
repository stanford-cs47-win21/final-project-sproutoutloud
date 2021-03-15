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
import FeedPosts from "./FeedPosts";

export default function HomeFeed({ contents, onPostRequested }) {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [loggedInUser,setLoggedInUser] = useState({})

  async function getPosts() {
    const allPosts = await firestore.collection("posts").get();
    return allPosts.docs.map((doc) => doc.data());
  }

  async function  getUser() {
    await firestore.collection("users").doc("user1").get().then((doc) => {
      if (doc.exists) {
        setLoggedInUser(doc.data())
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  useEffect(() => {
    if (contents) {
      setAllPosts(contents);
    } else {
      getAllPosts();
      getUser();
    }
  }, [contents]);

  let getAllPosts = () => {
    setLoading(true);
    var posts = getPosts();
    posts.then((data) => {
      // console.log(data)
      setAllPosts(data);
      setLoading(false);
    });
  };
  let onPostPressed = (post) => {
    onPostRequested(post);
  };

  let _keyExtractor = (item, index) => item.post_id;

  let renderItem = ({ item }) => {
    return <FeedPosts content={item} loggedInUser = {loggedInUser}/>;
  };

  function displayedContents() {
    let content = null;
    if (loading) {
      content = <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      content = (
        <FlatList
          data={allPosts}
          renderItem={renderItem}
          keyExtractor={_keyExtractor}
        />
      );
    }
    return content;
  }
  return <View style={styles.container}>{displayedContents()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
