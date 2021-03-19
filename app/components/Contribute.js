import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import db from "../firebase";
import * as Icon from "react-native-feather";
import * as firebase from "firebase";
import "firebase/firebase-storage";

export default function Contribute({ route, navigation }) {
  const { campaign, campaignOwner } = route.params;
  const [loggedInUser, setMe] = useState();

  useEffect(() => {
    loadMeData();
  });

  const loadMeData = async () => {
    const meRef = db.collection("users").doc("testUser");
    const meFromDatabase = await meRef.get();
    const meData = meFromDatabase.data();
    setMe(meData);
  };

  const getPermissionAsync = async (permission) => {
    const { status } = await Permissions.askAsync(permission);
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll or camera permissions to make this work!"
      );
    }
  };

  const uploadImage = async (uri) => {
      navigation.navigate("ConfirmContribution",{campaign:campaign,uri:uri,contributor:loggedInUser,campaignOwner:campaignOwner});
  };

  const uploadFromCamera = async () => {
    await getPermissionAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      quality: 0,
    });
    if (!result.cancelled) {
      await uploadImage(result.uri);
    } else {
    }
  };

  const uploadFromLibrary = async () => {
    await getPermissionAsync(Permissions.MEDIA_LIBRARY);
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0,
    });
    if (!result.cancelled) {
      await uploadImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", justifyContent: "flex-start" }}>
        <StatusBar barStyle="default" />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Upload an image of your action towards{" "}
          {campaignOwner.first_name + "'s " + campaign.name + " Campaign"}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={uploadFromCamera}>
          <View style={{ alignSelf: "center" }}>
            <Icon.Camera stroke={"#fff"} />
          </View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
              paddingLeft: 5,
              textAlign: "center",
            }}
          >
            Upload From Camera
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={uploadFromLibrary}>
          <View style={{ alignSelf: "center" }}>
            <Icon.Image stroke={"#fff"} />
          </View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
              paddingLeft: 5,
              textAlign: "center",
            }}
          >
            Upload From Image Library
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34B7F1",
    padding: 10,
    borderRadius: 50,
    width: 190,
    height: 60,
    flexDirection: "row",
  },
});
