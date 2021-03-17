import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Share, 
  TouchableOpacity, 
  TextInput,
  ImageBackground,
} from "react-native";
import { ThumbsUp, MessageCircle, Upload, Send, PlayCircle } from "react-native-feather";
import * as firebase from "firebase";
import PostHeader from "./PostHeader";
import PostProgress from "./PostProgress";
import db from "../firebase";
import Metrics from "../Metrics";

export default function FeedPost({ content, navigation }) {
  const { 
    id,
    campaign_picture, 
    campaign, 
    time, 
    content_picture,
    current_status,
    goal,
    likes,
    hasLiked,
    comments,
    hasCommented,
  } = content;

  const [poster, setPoster] = useState({});
  const [me, setMe] = useState({});
  const [commentText, setCommentText] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(hasLiked);
  const [numLikes, setNumLikes] = useState(likes);
  const [userHasCommented, setUserHasCommented] = useState(hasCommented);
  const [numComments, setNumComments] = useState(comments.length);

  const loadPosterData = async (userRef) => {
    const posterFromDatabase = await userRef.get();
    const poster = posterFromDatabase.data();
    setPoster(poster);
  };

  const loadMeData = async () => {
    const meRef = db.collection("users").doc("testUser");
    const meFromDatabase = await meRef.get();
    const meData = meFromDatabase.data();
    setMe(meData);
  }

  useEffect(() => {
    loadPosterData(content.user);
    loadMeData();
  }, []);

  const toggleLikePost = async () => {
    const newLikedState = !userHasLiked;
    const newNumLikes = (newLikedState) ? numLikes + 1 : numLikes - 1;
    setUserHasLiked(newLikedState);
    setNumLikes(newNumLikes);
    const docRef = db.collection("posts").doc(id);
    const result = await docRef.update({ likes: newNumLikes, hasLiked: newLikedState });
  }

  const LikeButton = () => {
    return (
      <View style={styles.buttonAndNumber}>
        <TouchableOpacity 
          style={userHasLiked ? styles.pressedGreenButton : styles.button} 
          onPress={toggleLikePost}>
          <ThumbsUp stroke={userHasLiked ? Metrics.greenColor : Metrics.darkGrayColor}/>
        </TouchableOpacity>
        <Text style={{ 
          ...styles.countText, 
          color: userHasLiked ? Metrics.greenColor : Metrics.darkGrayColor 
        }}>
          {numLikes}
        </Text>
      </View>
    );
  };

  const onPressComments = () => {
    navigation.navigate("ViewPost", {postId: id, posterId: content.user.id});
  };

  const CommentButton = () => {
    return (
      <View style={styles.buttonAndNumber}>
        <TouchableOpacity 
          style={userHasCommented ? styles.pressedBlueButton : styles.button} 
          onPress={onPressComments}>
          <MessageCircle stroke={userHasCommented ? Metrics.blueColor : Metrics.darkGrayColor}/>
        </TouchableOpacity>
        <Text style={{ 
          ...styles.countText, 
          color: userHasCommented ? Metrics.blueColor : Metrics.darkGrayColor 
        }}>
          {numComments}
        </Text>
      </View>
    );
  };

  const sharePost = async () => {
    await Share.share({message: `Sprout Out Loud: Check out this post from ${campaign}\n${Metrics.SITE_URL}`});
  };

  const ShareButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={sharePost}>
        <Upload stroke={Metrics.darkGrayColor}/>
      </TouchableOpacity>
    );
  };

  const viewCommentString = (numComments > 0) ? `View all ${numComments} comments` : "";

  const submitComment = async (text) => {
    if (text.length <= 0) return;
    setCommentText("");
    setUserHasCommented(true);
    setNumComments(numComments + 1);
    const newComment = { 
      content: text, 
      user: db.collection("users").doc("testUser"), 
      time: firebase.firestore.Timestamp.now(),
    }
    const docRef = db.collection("posts").doc(id);
    const result = await docRef.update({ 
      hasCommented: true, 
      comments: firebase.firestore.FieldValue.arrayUnion(newComment),
    });
  };

  return (
    <View style={styles.card}>
      <PostHeader 
        campaignPic={campaign_picture}
        campaignTitle={campaign}
        posterName={`${poster.first_name} ${poster.last_name}`}
        postTime={time}
      />
      <ImageBackground source={{ uri: content_picture }} style={styles.contentPic}>
        <PlayCircle 
          width={60}
          height={60} 
          stroke={Metrics.whiteColor} 
          strokeWidth={1}
          fill={'rgba(52, 52, 52, 0.75)'}
        />
      </ImageBackground>
      <PostProgress currentProgress={current_status} goal={goal} />

      <View style={styles.buttonTray}>
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </View>

      <View style={styles.commentComponent}>
        <TouchableOpacity onPress={onPressComments}>
          <Text style={styles.viewCommentsText}>
            {viewCommentString}
          </Text>
        </TouchableOpacity>
        <View style={styles.commentTray}>
          <Image source={{ uri: me.profile_pic }} style={styles.userPic}/>
          <View style={styles.commentField}>
            <TextInput 
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
              onSubmitEditing={() => submitComment(commentText)}
              returnKeyType="send"
              placeholder="Add a comment..."
            />
          </View>
          <TouchableOpacity onPress={() => submitComment(commentText)}>
            <Send stroke={Metrics.darkGrayColor} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Metrics.whiteColor,
    height: '100%',
    width: Metrics.screenWidth * 0.97,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 24,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1,
    padding: 12,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  contentPic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    resizeMode: 'contain',
    marginTop: 6,
    marginBottom: 8,
  },
  buttonTray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonAndNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: Metrics.userInputColor,
  },
  pressedGreenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: Metrics.lightGreenColor,
  },
  pressedBlueButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: Metrics.lightBlueColor,
  },
  countText: {
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
    fontWeight: Metrics.fontWeightMedium,
    marginLeft: 6,
  },
  commentComponent: {
    marginTop: 6,
  },
  viewCommentsText: {
    fontFamily: Metrics.fontFamily,
    fontSize: 14,
    fontWeight: Metrics.fontWeightMedium,
    marginBottom: 2,
  },
  commentTray: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userPic: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
    marginRight: 3,
    borderRadius: 32,
    backgroundColor: Metrics.progressUnfilledColor,
  },
  commentField: {
    flex: 1,
    justifyContent: 'center',
    height: 32,
    borderRadius: 32,
    backgroundColor: Metrics.userInputColor,
  },
  commentInput: {
    height: 24,
    marginHorizontal: 8
  },
  sendIcon: {
    transform: [
      {rotate: '45deg'}, 
      {translateX: -3}, 
      {translateY: 3},
    ],
  }
});
