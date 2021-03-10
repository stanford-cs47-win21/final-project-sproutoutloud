import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from "./CustomButton";
import Metrics from '../Metrics';
import Images from '../Images';

export default function SustainableActivity({ route }) {

  const { title, eventPic, details, description } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image style={styles.eventPic} source={eventPic} />
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>{details}</Text>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <CustomButton buttonText={"Visit Website"} onPress={null} />
      <CustomButton buttonText={"Add to Calendar"} onPress={null} />
      <CustomButton buttonText={"Share Activity"} onPress={null} />
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
  titleContainer: {
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    fontSize: 28,
  },
  detailsContainer: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  details: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: Metrics.fontWeightMedium,
    fontSize: 20,
  },
  descContainer: {
    marginHorizontal: 12,
    paddingBottom: 16,
  },
  description: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
  }
});