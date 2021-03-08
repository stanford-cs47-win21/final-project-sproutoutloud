import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  // colors
  lightColor: "#FFFFFF",
  lightGrayColor: "#C4C4C4",
  darkGrayColor: "#8E8E92",
  // fonts
  fontFamily: 'System',
};

export default metrics;
