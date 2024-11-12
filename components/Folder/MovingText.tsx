import {  StyleSheet, Text, View  , TextStyle} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  Easing,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface MovingTextProp {
  text: string;
  animatedThreshold: number;
  style?: TextStyle;
} 
const MovingText: React.FC<MovingTextProp> = ({
  text,
  animatedThreshold,
  style

}) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animatedThreshold;
  const textWidth = text.length * 3;

  useEffect(() => {
    if (!shouldAnimate) return;
    //if true we have to animate this
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, { duration: 5000, easing: Easing.linear }),
        -1, //Means infinite time translation
       
      )
    );
  }, [text , translateX , animatedThreshold,textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }], //Transform to translate x because text is moving to the x axis
    };
  });
  return (
    <Animated.Text numberOfLines={1} style={ [animatedStyle , style, shouldAnimate && {
        width:150,
        paddingLeft:16,
        marginLeft:8,
        paddingStart:16
    } ] }>
     {text}
    </Animated.Text>
  );
};

export default MovingText;