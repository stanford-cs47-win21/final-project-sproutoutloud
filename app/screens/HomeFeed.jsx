import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeFeed() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Sprout Out Loud!</Text>
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