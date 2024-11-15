import { Stack } from "expo-router";
import { useEffect , useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { currentSongContext } from "@/context/context";
import { Provider } from "react-redux";
import {store} from "../redux/store"

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
  const [positionMillis, setPositionMillis] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Provider store={store}>
    <currentSongContext.Provider value={{ Playing, setPlaying , positionMillis ,  setPositionMillis , isPlaying , setIsPlaying  }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="LikeScreen" options={{headerShown:false}}/>
      <Stack.Screen name="PlayerScreen" options={{headerShown:false}}/>

    </Stack>
    </GestureHandlerRootView>
    </currentSongContext.Provider>
    </Provider>
  );
}