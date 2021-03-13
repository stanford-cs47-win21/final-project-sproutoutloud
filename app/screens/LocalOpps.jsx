import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
    briefDetails: "0.5 miles away - Sunday, March 14, 2021",
    cardIcon: Images.oval_icon,
    latitude: 37.43, 
    longitude: -122.1695,
    pinIcon: Images.oval_pin,
    description: "Looking for a fun way to contribute to a campaign this weekend? Join us for a trash pick-up session at the Stanford Oval!",
    details: "Sunday, March 14, 2021 at 3:00 PM",
    eventPic: Images.oval_pic,
    calendarUrl: "https://ical.yc.sg/3cp3R57",
  },
  {
    title: "Stanford Stadium Recycling",
    subtitle: "Recycling at Stanford Stadium Parking Lot",
    briefDetails: "0.6 miles away - Tomorrow, March 13, 2021",
    cardIcon: Images.stadium_icon,
    latitude: 37.433, 
    longitude: -122.163,
    pinIcon: Images.stadium_pin,
    description: "Need an exciting activity to contribute to a campaign? Come on over to Stanford Stadium and help us recycle a ton of leftover beer cans!",
    details: "Tomorrow, March 13, 2021 at 1:00 PM",
    eventPic: Images.stadium_pic,
    calendarUrl: "https://ical.yc.sg/3vlKlz9",
  },
  {
    title: "Lake Lagunita Tree Planting",
    subtitle: "Planting at the west end of Lake Lagunita",
    briefDetails: "0.7 miles away - Friday, March 19, 2021",
    cardIcon: Images.lakelag_icon,
    latitude: 37.425, 
    longitude: -122.177,
    pinIcon: Images.lakelag_pin,
    description: "Looking for a gardening activity to contribute? Exercise your green thumb and come join us in planting trees over on the west end of Lake Lag!",
    details: "Friday, March 19, 2021 at 2:00 PM",
    eventPic: Images.lakelag_pic,
    calendarUrl: "https://ical.yc.sg/3vdd1Kt",
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
      <Text style={styles.headerTitle}>Sustainable Activity</Text>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: Metrics.fontWeightMedium,
  },
});