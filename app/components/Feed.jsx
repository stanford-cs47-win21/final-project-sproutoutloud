import React, { useState, useEffect} from "react";
import { 
  StyleSheet, 
  View, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl 
} from "react-native";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import FeedPost from "./FeedPost";
import db from "../firebase";
import Metrics from '../Metrics';

export default function HomeFeed({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const parsePostsFromDatabase = (postsFromDatabase, collectionPath) => {
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
    const posts = parsePostsFromDatabase(postsFromDatabase, "posts");
    setAllPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    loadAllPosts();
  }, [refreshing]);

  const renderFeedPost = ({ item }) => {
    return <FeedPost content={item} navigation={navigation} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAllPosts();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color={Metrics.greenColor} />
      ) : (
        <KeyboardAwareFlatList 
          data={allPosts} 
          renderItem={renderFeedPost} 
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Metrics.greenColor} 
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
