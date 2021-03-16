import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Share, TouchableOpacity, TextInput} from "react-native";
import { ThumbsUp, MessageCircle, Upload, Send } from "react-native-feather";
import PostHeader from "./PostHeader";
import PostProgress from "./PostProgress";
import Metrics from "../Metrics";


export default function FeedPost({ content }) {
  const [commentText, setCommentText] = useState("");
  const [poster, setPoster] = useState({});
  const [hasLiked, setHasLiked] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);

  const loadUserData = async (userRef) => {
    const user = await userRef.get();
    setPoster(user.data());
  };

  useEffect(() => {
    loadUserData(content.user);
  }, []);

  const { 
    campaign_picture, 
    campaign, 
    time, 
    content_picture,
    current_status,
    goal,
    likes,
    comment_count,
  } = content;

  const likePost = () => {
    setHasLiked(true);
  }

  const LikeButton = () => {
    return (
      <View style={styles.buttonAndNumber}>
        <TouchableOpacity 
          style={hasLiked ? styles.pressedGreenButton : styles.button} 
          onPress={likePost}>
          <ThumbsUp stroke={hasLiked ? Metrics.greenColor : Metrics.darkGrayColor}/>
        </TouchableOpacity>
        <Text style={{ 
          ...styles.countText, 
          color: hasLiked ? Metrics.greenColor : Metrics.darkGrayColor 
        }}>
          {likes}
        </Text>
      </View>
    );
  };

  const CommentButton = () => {
    return (
      <View style={styles.buttonAndNumber}>
        <TouchableOpacity 
          style={hasCommented ? styles.pressedBlueButton : styles.button} 
          onPress={null}>
          <MessageCircle stroke={hasCommented ? Metrics.blueColor : Metrics.darkGrayColor}/>
        </TouchableOpacity>
        <Text style={{ 
          ...styles.countText, 
          color: hasCommented ? Metrics.blueColor : Metrics.darkGrayColor 
        }}>
          {comment_count}
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

  const viewCommentString = (comment_count > 0) ? `View all ${comment_count} comments` : "";

  const submitComment = (text) => {
    if (text.length <= 0) return;
    setCommentText("");
    setHasCommented(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
      
        <PostHeader 
          campaignPic={campaign_picture}
          campaignTitle={campaign}
          posterName={`${poster.first_name} ${poster.last_name}`}
          postTime={time}
        />
        <Image source={{ uri: content_picture }} style={styles.contentPic} />
        <PostProgress currentProgress={current_status} goal={goal} />

        <View style={styles.buttonTray}>
          <LikeButton />
          <CommentButton />
          <ShareButton />
        </View>

        <View style={styles.commentComponent}>
          <Text style={styles.viewCommentsText}>
            {viewCommentString}
          </Text>
          <View style={styles.commentTray}>
            <Image source={{ uri: poster.profile_pic }} style={styles.userPic}/>
            <View style={styles.commentField}>
              <TextInput 
                style={styles.commentInput}
                value={commentText}
                onChangeText={setCommentText}
                onSubmitEditing={(event) => submitComment(event.nativeEvent.text)}
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
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  contentPic: {
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
