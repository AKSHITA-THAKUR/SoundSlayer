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

export default function Index() {
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
        renderItem={SongList}
        contentContainerStyle={{ paddingBottom: 400 }}
      />
      <CurrentPlayer />
    </View>
  );
}
