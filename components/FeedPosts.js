import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "firebase";
import firestore from "../firebase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Card } from "react-native-paper";


export default function FeedPosts({ content, onPostRequested }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async (user) => {
      const uniqueUser = await user.get();
      if (!uniqueUser.exists) {
        console.log("No User Found");
      } else {
        setUser(uniqueUser.data())
      }
    };
    getUserData(content.user)
  },[])
  function  onPress(params) {
    console.log(user.first_name)
  }
  return (
   
      <Card style={styles.container}>
         <TouchableOpacity onPress={onPress}>
        <Image source = {{uri:user.profile_pic}} style={styles.image} />
        </TouchableOpacity>
        <Text>{user.first_name + " " + user.last_name}</Text>
        <Text>{content.campaign}</Text>
        <Text> View all {content.comment_count} comments </Text>
        <Text>{content.likes}</Text>
        <Text>{content.comments[0].content}</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          // onChangeText={text => onChangeText(text)}
          // value={value}
        />
      </Card>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 50,
    width: 367,
    height: 364.05,
  },
  image: {
    width: 100,
    height: 100,
  },
});
