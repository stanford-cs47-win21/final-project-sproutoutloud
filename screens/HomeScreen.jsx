import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from '../components/Feed';

export default function HomeFeed() {
  return (
    <View style={styles.container}>
     <Feed/>
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