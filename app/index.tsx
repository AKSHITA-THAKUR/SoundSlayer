import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SongList from "@/components/Folder/SongList";
import { songsWithCategory } from "@/data/songsWithCategory";
import CurrentPlayer from "@/components/CurrentPlayer";
import Header from "@/components/Folder/Header";
import { SongCategory } from "@/data/songsWithCategory";
import TrackPlayer from "react-native-track-player";
import { useContext } from "react";
import { currentSongContext } from "@/context/context";
export default function Index() {
  const {Playing} = useContext(currentSongContext);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: hp(4),
        backgroundColor: Colors.background,
      }}
    >
      <Header />
      <FlatList
        data={songsWithCategory}
        renderItem={({item})=> <SongList item={item}/>}
        contentContainerStyle={{ paddingBottom: 400 }}
      />
      {Playing.songTitle ? <CurrentPlayer /> : null}
     
    </View>
  );
}
