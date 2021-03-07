import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from 'firebase';
import firestore from '../firebase';

async function getShit(user_id){
    
    const user = await firestore.collection('users').doc('thakur')
    console.log("UserData",user)
  }

export default function FeedPosts({ content, onPostRequested }) {
    getShit(content.user_id);
    console.log(content)
  return <Text>{content.user_id}</Text>;
}
