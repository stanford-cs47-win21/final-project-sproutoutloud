import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from '../components/Feed';
import firestore from "../firebase/Firebase";

export default function HomeFeed() {
  var posts = firestore.ref('users');
  posts.on('value',(snapshot) => {
    const data = snapshot.val();
    console.log(data)
  })
  return (
    <View style={styles.container}>
     <Feed/>
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