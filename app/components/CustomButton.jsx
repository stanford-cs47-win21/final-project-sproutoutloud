import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Metrics from '../Metrics';

export default function CustomButton({ buttonText, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Metrics.blueColor,
    height: 48,
    width: 240,
    borderRadius: 24,
    marginVertical: 6,
  },
  text: {
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    color: Metrics.whiteColor,
    letterSpacing: 0.3,
    fontSize: 18,
  }
});