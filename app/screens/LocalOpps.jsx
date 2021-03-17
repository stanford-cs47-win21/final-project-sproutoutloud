import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import navigation screens
import MapTab from "../components/MapTab";
import SustainableActivity from "../components/SustainableActivity";
// import auxiliary classes
import Metrics from '../Metrics';
import Images from '../Images';

const EVENT_LIST = [
  {
    title: "Clean Up the Oval",
    subtitle: "Trash pick-up at the Stanford Oval",
    briefDetails: "0.5 miles away - Sunday, March 21, 2021",
    cardIcon: Images.oval_icon,
    latitude: 37.43, 
    longitude: -122.1695,
    pinIcon: Images.oval_pin,
    description: "Looking for a fun way to contribute to a campaign this weekend? Join us for a trash pick-up session at the Stanford Oval!",
    details: "Sunday, March 21, 2021 at 4:00 PM",
    eventPic: Images.oval_pic,
    calendarUrl: "https://bit.ly/3eN7iFq",
  },
  {
    title: "Stanford Stadium Recycling",
    subtitle: "Recycling at Stanford Stadium Parking Lot",
    briefDetails: "0.6 miles away - Tomorrow, March 20, 2021",
    cardIcon: Images.stadium_icon,
    latitude: 37.433, 
    longitude: -122.163,
    pinIcon: Images.stadium_pin,
    description: "Need an exciting activity to contribute to a campaign? Come on over to Stanford Stadium and help us recycle a ton of leftover beer cans!",
    details: "Tomorrow, March 20, 2021 at 2:00 PM",
    eventPic: Images.stadium_pic,
    calendarUrl: "https://bit.ly/2OIXt0z",
  },
  {
    title: "Lake Lagunita Tree Planting",
    subtitle: "Planting at the west end of Lake Lagunita",
    briefDetails: "0.7 miles away - Friday, March 26, 2021",
    cardIcon: Images.lakelag_icon,
    latitude: 37.425, 
    longitude: -122.177,
    pinIcon: Images.lakelag_pin,
    description: "Looking for a gardening activity to contribute? Exercise your green thumb and come join us in planting trees over on the west end of Lake Lag!",
    details: "Friday, March 26, 2021 at 2:00 PM",
    eventPic: Images.lakelag_pic,
    calendarUrl: "https://bit.ly/38RPYLI",
  },
];

const Stack = createStackNavigator();

export default function LocalOpps() {
  
  const renderMapHeader = () => {
    return (
      <Text style={styles.headerTitle}>Nearby Activities</Text>
    );
  };

  const renderActivityHeader = () => {
    return (
      <Text style={styles.headerTitle}>Activity Page</Text>
    );
  };

  return (
    <Stack.Navigator initialRouteName="MapTab">
      <Stack.Screen name="MapTab" options={{ headerTitle: renderMapHeader }}>
        {(props) => <MapTab {...props} events={EVENT_LIST}/>}
      </Stack.Screen>
      <Stack.Screen 
        name="SustainableActivity" 
        component={SustainableActivity}
        intialParams={{
          title: "", 
          eventPic: null, 
          details: "", 
          description: ""
        }}
        options={{ 
          headerTitle: renderActivityHeader, 
          headerBackTitleVisible: false, 
          headerTintColor: Metrics.blackColor,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: Metrics.fontWeightMedium,
  },
});