import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import MapEventCard from './MapEventCard';
import Metrics from '../Metrics';
import Images from '../Images';

const SNAP_POINT_LOW = 52;
const SNAP_POINT_HIGH = 240;

function drawerHeader() { 
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
}

function drawerContent() { 
  return (
    <View style={styles.content}> 
      <MapEventCard
        title="Clean Up the Oval"
        subtitle="Trash pick-up at the Stanford Oval"
        details="0.5 miles away - Sunday, March 14, 2021"
        icon={Images.oval_icon}
      />
      <MapEventCard
        title="Stanford Stadium Recycling"
        subtitle="Recycling at Stanford Stadium Parking Lot"
        details="0.7 miles away - Tomorrow, March 13, 2021"
        icon={Images.stadium_icon}
      />
      <MapEventCard
        title="Lake Lagunita Tree Planting"
        subtitle="Planting at the west end of Lake Lagunita"
        details="0.9 miles away - Friday, March 19, 2021"
        icon={Images.lakelag_icon}
      />
    </View>
  );
}

export default function MapDrawer() {
  return (
    <BottomSheet
      snapPoints={[SNAP_POINT_HIGH, SNAP_POINT_LOW]}
      initialSnap={1}
      renderContent={drawerContent}
      renderHeader={drawerHeader}
      enabledInnerScrolling={false}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    backgroundColor: Metrics.lightColor,
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
    backgroundColor: Metrics.lightColor,
  }
});