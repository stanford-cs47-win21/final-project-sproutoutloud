import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapDrawer from "../components/MapDrawer";
import Metrics from '../Metrics';
import Images from '../Images';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapView}
        region={{
          latitude: 37.4265,
          longitude: -122.1690,
          latitudeDelta: 0.01,
          longitudeDelta: 0.02,
        }}
        mapType='standard'
        rotateEnabled={false}
        loadingEnabled={true}
      >
        <Marker coordinate={{ latitude: 37.4315 , longitude: -122.1695 }} image={Images.oval_pin}/>
        <Marker coordinate={{ latitude: 37.434 , longitude: -122.163 }} image={Images.stadium_pin}/>
        <Marker coordinate={{ latitude: 37.426 , longitude: -122.177 }} image={Images.lakelag_pin}/>
      </MapView>
      <MapDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});