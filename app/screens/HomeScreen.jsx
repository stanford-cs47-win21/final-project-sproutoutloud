import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from '../components/Feed';


export default function HomeScreen({navigation}) {

  let onPostRequested = (post) => {
    console.log(post)
  }

  return (
    <View style={styles.container}>
     <Feed onPostRequested={onPostRequested}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});