import React from 'react';
import { StyleSheet, Text, View, Image, Share } from 'react-native';
import CustomButton from "./CustomButton";
import Metrics from '../Metrics';


export default function SustainableActivity({ route }) {

  const { title, eventPic, details, description } = route.params;

  const shareActivity = async () => {
    await Share.share({
      message: "Sprout Out Loud: Here's a cool sustainable activity for you to do!\nhttp://web.stanford.edu/class/cs147/projects/Sustainability/SproutOutLoud/",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.eventPic} source={eventPic} />
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.description}>{description}</Text>
      <CustomButton buttonText={"Visit Website"} onPress={null} />
      <CustomButton buttonText={"Add to Calendar"} onPress={null} />
      <CustomButton buttonText={"Share Activity"} onPress={shareActivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Metrics.whiteColor,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  eventPic: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.705,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    fontSize: 28,
    paddingVertical: 12,
  },
  details: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: Metrics.fontWeightMedium,
    fontSize: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  description: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
    marginHorizontal: 12,
    paddingBottom: 16,
  }
});