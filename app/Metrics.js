import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const metrics = {
  SITE_URL: "http://web.stanford.edu/class/cs147/projects/Sustainability/SproutOutLoud/",
  // dimensions
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  // colors
  userInputColor: "#F4F4F4",
  progressUnfilledColor: "#CFEFE4",
  whiteColor: "#FFFFFF",
  blackColor: "#000000",
  charcoalColor: "#455A64",
  lightGrayColor: "#C4C4C4",
  darkGrayColor: "#8E8E92",
  greenColor: "#25D366",
  lightGreenColor: "#ECFAF1",
  blueColor: "#34B7F1",
  lightBlueColor: "#EDF8FD",
  // fonts
  fontFamily: 'System',
  fontWeightMedium: '600',
};

export default metrics;
