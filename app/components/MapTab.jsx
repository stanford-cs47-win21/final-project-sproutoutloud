import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapDrawer from "./MapDrawer";
import Images from '../Images';

export default function MapTab({ navigation, events }) {
  const navigateToActivity = (event) => {
    navigation.navigate("SustainableActivity", 
    {
      title: event.title, 
      eventPic: event.eventPic, 
      details: event.details, 
      description: event.description
    });
  };

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
        {events.map((event, idx) =>
          <Marker
            key={idx}
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            image={event.pinIcon}
            onPress={() => navigateToActivity(event)}
          />
        )}
      </MapView>
      <MapDrawer navigation={navigation} events={events} />
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