import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from "react-native-progress";
import Metrics from "../Metrics"

export default function PostProgress({ currentProgress, goal}) {
  const progress = currentProgress / goal;
  return (
    <View style={styles.progress}>
      <Progress.Bar
        progress={progress}
        color={Metrics.greenColor}
        unfilledColor={Metrics.progressUnfilledColor}
        borderWidth={0}
        width={null}
        height={14}
        borderRadius={14}
      />
      <Text style={styles.progressText}>
        {`${currentProgress.toString()} / ${goal.toString()} posts`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    marginBottom: 6,
  },
  progressText: {
    alignSelf: 'flex-end',
    fontFamily: Metrics.fontFamily,
    fontSize: 13,
    color: Metrics.darkGrayColor,
  },
});