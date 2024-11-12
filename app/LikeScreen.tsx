import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { currentSongContext } from "@/context/context";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";

const LikeScreen = () => {
  
  const songs = useSelector((state: RootState) => state.likedSong.likedSongs);
  const {setPlaying} = useContext(currentSongContext);

  const renderSongItem = ({ item }: { item: (typeof songs)[0] }) => (
    <TouchableOpacity style={styles.container} >
      <Image source={{ uri: item.artwork }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.semiTitle}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );





  return (
    <View style={{ flex: 1, backgroundColor: Colors.background  }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.Heading}>Liked Songs</Text>
      </View>
      <View style={{marginTop:hp(4)}}>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row} 
      />
      </View>
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: wp(2),
    padding: 5,
    borderRadius: 15,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: wp(50), 
    borderRadius: 12,
  },
  textContainer: {
    paddingVertical: 8,
    alignItems: "center",
  },
  title: {
    color: Colors.textPrimary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  semiTitle: {
    color: Colors.textSecndary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: wp(2),
    paddingBottom: hp(2),
  },
  row: {
    justifyContent: "space-between", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(7),
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 20,
  },
  Heading: {
    color: Colors.textPrimary,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
});
