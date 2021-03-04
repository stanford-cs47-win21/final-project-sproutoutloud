import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Metrics from '../Metrics'


export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapView}
        region={{
          latitude: 37.4282,
          longitude: -122.1689,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        mapType={'terrain'}
      />
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
  mapView: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
  },
});