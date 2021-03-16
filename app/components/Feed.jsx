import React, { useState, useEffect} from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import FeedPost from "./FeedPost";
import db from "../firebase";
import Metrics from '../Metrics';

export default function HomeFeed() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const parsePostsFromDatabase = (postsFromDatabase) => {
    const parsedPosts = [];
    postsFromDatabase.forEach((post) => {
      const postData = post.data();
      postData["id"] = post.id;
      parsedPosts.push(postData);
    });
    return parsedPosts;
  };

  const loadAllPosts = async () => {
    setLoading(true);
    setAllPosts([]);
    const collRef = db.collection("posts");
    const postsFromDatabase = await collRef.get();
    const posts = parsePostsFromDatabase(postsFromDatabase);
    setAllPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  const renderFeedPost = ({ item }) => {
    return <FeedPost content={item} />;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color={Metrics.greenColor} />
      ) : (
        <KeyboardAwareFlatList 
          data={allPosts} 
          extraScrollHeight={-48}
          renderItem={renderFeedPost} 
          keyExtractor={(item, index) => item.post_id}
          directionalLockEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
