import { Stack } from "expo-router";
import { useEffect , useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from "react-native-track-player";
import { currentSongContext } from "@/context/context";

interface SongInfo {
  imageUrl: string;
  artist: string;
  songTitle: string;
  songUrl: string;
}
export default function RootLayout() {
  const [Playing, setPlaying] = useState<SongInfo>({
    imageUrl: "",
    artist: "",
    songTitle: "",
    songUrl: ""
  });

  return (
    <currentSongContext.Provider value={{ Playing, setPlaying }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="LikeScreen" options={{headerShown:false}}/>
      <Stack.Screen name="PlayerScreen" options={{headerShown:false}}/>

    </Stack>
    </GestureHandlerRootView>
    </currentSongContext.Provider>
  );
}