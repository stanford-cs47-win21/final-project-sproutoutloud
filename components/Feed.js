import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import firestore from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import FeedPosts from './FeedPosts';

async function getShit(){
  const allPosts = await firestore.collection('posts').get()
  return allPosts.docs.map(doc => doc.data())
}

export default function HomeFeed({contents,onPostRequested}) {
  const [loading,setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    if(contents){
      setAllPosts(contents)
    }else{
      getAllPosts();
    }
  },[contents])

  let getAllPosts = () => {
    setLoading(true);
    var posts = getShit();
    posts.then( (data) => {
      // console.log(data)
      setAllPosts(data)
      setLoading(false)
    }
    )
  }

  let onPostPressed = (post) => {
    onPostRequested(post)
  }

  let _keyExtractor = (item, index) => item.post_id;

  let renderItem = ({item}) => {
   return <FeedPosts content={item}/>
  }
  
  function displayedContents(){
    let content = null;
    if(loading){
      content = <ActivityIndicator size="large" color="#0000ff" />;
    }else{
      content = 
      <TouchableOpacity>
           <FlatList
             data = {allPosts}
             renderItem={renderItem}
             keyExtractor={_keyExtractor}     
         />
      </TouchableOpacity>
   
    }
    return content;
  }




  return (
    <View style={styles.container}>
    {displayedContents()}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});