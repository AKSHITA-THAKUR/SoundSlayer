import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { StatusBar } from "expo-status-bar";
  import { useNavigation } from "expo-router";
  import SongCard from "@/components/Folder/SongCard";
  import { Colors } from "@/constants/Colors";
  import { heightPercentageToDP as hp } from "react-native-responsive-screen";
  
  const LikeScreen = () => {
    const navigation = useNavigation();
    const flatListKey = `liked-songs-${2}`; // Unique key for FlatList to prevent re-render errors
    const ItemSeparator = () => <View style={{ width: 20 }} />;
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar style="light" />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Liked Songs</Text>
        <FlatList
          key={flatListKey}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => <SongCard />}
          numColumns={2}
        />
      </View>
    );
  };
  
  export default LikeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 20,
      paddingHorizontal: 30,
      marginTop: hp(4),
    },
    title: {
      color: Colors.textPrimary,
      fontSize: 30,
      fontWeight: "700",
      paddingHorizontal: 20,
      marginVertical: 10,
    },
  });