import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';


export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>campaign screens go here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});