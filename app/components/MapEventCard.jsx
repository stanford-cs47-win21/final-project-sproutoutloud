import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Metrics from '../Metrics';

export default function MapEventCard({ title, subtitle, details, icon }) {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.icon} source={icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  icon: {
    width: 48,
    height: 48,
  },
  textContainer: {
    paddingHorizontal: 8
  },
  title: {
    fontFamily: Metrics.fontFamily,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: Metrics.fontFamily,
    fontSize: 14,
    color: Metrics.darkGrayColor,
  },
  details: {
    fontFamily: Metrics.fontFamily,
    fontSize: 12,
    color: Metrics.lightGrayColor,
  },
});