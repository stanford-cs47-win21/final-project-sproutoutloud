import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  // colors
  whiteColor: "#FFFFFF",
  blackColor: "#000000",
  lightGrayColor: "#C4C4C4",
  darkGrayColor: "#8E8E92",
  blueColor: "#34B7F1",
  greenColor: "#25D366",
  // fonts
  fontFamily: 'System',
  fontWeightMedium: '600',
};

export default metrics;
