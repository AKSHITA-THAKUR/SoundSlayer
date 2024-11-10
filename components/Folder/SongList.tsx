import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import SongCard from "./SongCard";
import { SongCategory } from "@/data/songsWithCategory";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ItemSeparator = () => <View style={{ width: 20 }} />; 
const SongList:React.FC<SongCategory> = ({item}) => {
  return (
    <View style={{ backgroundColor: "transparent", flex:1, paddingLeft:wp(2)}}>
     <Text style={{ color: Colors.textPrimary , fontSize:30 , fontWeight:"700" , padding:5 }}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={SongCard}
        ItemSeparatorComponent={ItemSeparator}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SongList;