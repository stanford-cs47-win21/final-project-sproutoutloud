import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import MapEventCard from './MapEventCard';
import Metrics from '../Metrics';
import Images from '../Images';

export default function MapDrawer({ navigation, events }) {

  const SNAP_POINT_LOW = 52;
  const SNAP_POINT_HIGH = 240; 

  const navigateToActivity = (event) => {
    navigation.navigate("SustainableActivity", 
    {
      title: event.title, 
      eventPic: event.eventPic, 
      details: event.details, 
      description: event.description
    });
  };

  const renderContent = () => {
    return (
      <View style={styles.content}> 
        {events.map((event, idx) => 
          <MapEventCard
            key={idx}
            title={event.title}
            subtitle={event.subtitle}
            details={event.briefDetails}
            icon={event.cardIcon}
            onPress={() => navigateToActivity(event)}
          />
        )}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} /> 
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Activities Near Me</Text>
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      snapPoints={[SNAP_POINT_HIGH, SNAP_POINT_LOW]}
      initialSnap={1}
      renderContent={renderContent}
      renderHeader={renderHeader}
      enabledContentTapInteraction={false}
      enabledInnerScrolling={false}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    backgroundColor: Metrics.whiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: Metrics.lightGrayColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  handleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  handle: {
    backgroundColor: Metrics.lightGrayColor,
    width: 40,
    height: 4,
    borderRadius: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  title: {
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    fontSize: 28,
  },
  content: {
    backgroundColor: Metrics.whiteColor,
  }
});