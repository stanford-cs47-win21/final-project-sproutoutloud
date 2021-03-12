import React from 'react';
import { StyleSheet, View } from 'react-native';
import Metrics from "../Metrics"

export default function Card(props) {

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    width:Metrics.screenWidth-10,
    height:360
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  }
});