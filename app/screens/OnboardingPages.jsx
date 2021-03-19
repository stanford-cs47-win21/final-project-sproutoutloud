import React from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Image,
  Text, 
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
// import auxiliary classes
import Metrics from "../Metrics";
import Images from "../Images";

const LogoBanner = ({ style }) => {
  return (
    <View style={style}>
      <Image source={Images.logo} style={styles.logoBanner} />
    </View>
  );
}

const Page1 = ({ navigateToMainApp }) => {
  return(
    <SafeAreaView style={styles.splashContainer}>
      <Image source={Images.logo} style={styles.bigLogo} />
      <View style={styles.valuePropContainer}> 
        <Text style={styles.valueProp}>
          {"Record your impact,\ninspire sustainability"}
        </Text>
      </View>
      <TouchableOpacity style={styles.tappable} onPress={navigateToMainApp}>
        <Text style={styles.tapText}>tap here to skip onboarding</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Page2 = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <LogoBanner style={{ paddingBottom: Metrics.screenHeight * 0.05 }} />
      <Image source={Images.page2} style={styles.illustration} />
      <View style={styles.progressView}>
        <Text style={styles.campaignTitle}>Save the Trees! Campaign</Text>
        <Progress.Bar
          progress={0.4}
          color={Metrics.greenColor}
          unfilledColor={Metrics.progressUnfilledColor}
          borderWidth={0}
          width={Metrics.screenWidth * 0.7}
          height={14}
          borderRadius={14}
        />
      </View>
      <Text style={styles.text}>
        {"Join "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"campaigns "}
        </Text>
        {"to team up with others working towards a "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"shared goal"}
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const Page3 = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <LogoBanner style={{ paddingBottom: Metrics.screenHeight * 0.072 }} />
      <Image source={Images.page3} style={{...styles.illustration, marginBottom: 32}} />
      <Text style={styles.text}>
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"Find "}
        </Text>
        {"fun sustainable "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"activities near you "}
        </Text>
        {"that you can engage in"}
      </Text>
    </SafeAreaView>
  );
};

const Page4 = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <LogoBanner style={{ paddingBottom: Metrics.screenHeight * 0.09 }} />
      <Image source={Images.page4} style={styles.illustration} />
      <Text style={styles.text}>
        {"Take "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"pictures or videos "}
        </Text>
        {"while engaging in "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"activities "}
        </Text>
        {"to document your "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"contribution "}
        </Text>
        {"to a campaign"}
      </Text>
    </SafeAreaView>
  );
};

const Page5 = ({ navigateToMainApp }) => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <LogoBanner style={{ paddingBottom: Metrics.screenHeight * 0.09 }} />
      <Image source={Images.page5} style={styles.illustration} />
      <Text style={styles.text}>
        {"Celebrate by sharing a "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"video montage "}
        </Text>
        {"at the end of a "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"campaign "}
        </Text>
        {"and "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"visualize "}
        </Text>
        {"the campaign's "}
        <Text style={{ ...styles.text, color: Metrics.greenColor }}>
          {"collective impact"}
        </Text>
      </Text>
      <TouchableOpacity style={styles.tappable} onPress={navigateToMainApp}>
        <Text style={styles.tapText}>tap here to get started!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { Page1, Page2, Page3, Page4, Page5 };

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: Metrics.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pageContainer: {
    backgroundColor: Metrics.whiteColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  bigLogo: {
    width: Metrics.screenWidth * 0.93,
    resizeMode: 'contain',
  },
  valuePropContainer: {
    width: '100%',
    alignItems: 'center',
  },
  valueProp: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: Metrics.fontWeightMedium,
    fontStyle: 'italic',
    fontSize: 28,
    letterSpacing: -0.84,
    color: Metrics.darkGrayColor,
  },
  logoBanner: {
    height: 54,
    width: Metrics.screenWidth * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  illustration: {
    width: Metrics.screenWidth,
    height: 385,
    resizeMode: 'contain',
  },
  progressView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 40,
  },
  campaignTitle: {
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    fontSize: 15,
  },
  text: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: Metrics.fontWeightMedium,
    fontSize: 22,
    letterSpacing: -0.66,
    color: Metrics.charcoalColor,
    marginHorizontal: 8,
  },
  tappable: {
    position: 'absolute',
    top: Metrics.screenHeight * 0.88,
  },
  tapText: {
    textAlign: 'center',
    fontFamily: Metrics.fontFamily,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    letterSpacing: -0.24,
    color: Metrics.darkGrayColor
  },
});