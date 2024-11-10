import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from "react-native-track-player";
export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="LikeScreen" options={{headerShown:false}}/>
      <Stack.Screen name="PlayerScreen" options={{headerShown:false}}/>

    </Stack>
    </GestureHandlerRootView>
  );
}