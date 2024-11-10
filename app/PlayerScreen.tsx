import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons  , AntDesign} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const PlayerScreen = () => {
  const [pause , setPause] = useState<boolean>(false);
  const [liked, isLiked] = useState<boolean>(false);
  const navigation = useNavigation();
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Playing Now</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Image
          style={{ height: hp(40), width: wp(70), borderRadius: 20 }}
          source={require("../assets/images/Song1.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-around",
          marginLeft: 40,
        }}
      >
        <View style={{alignItems:"center"}}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.textPrimary,
              fontWeight: "700",
            }}
          >
            Love me like you do
          </Text>
          <Text style={{ fontSize: 20, color: Colors.textSecndary }}>
            Alan Walker
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ marginTop: 5, marginLeft: 20 }}
            onPress={() => isLiked(!liked)}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={44}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{padding:30 , marginTop:20}}>
      <Slider
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      containerStyle={{height:10 , borderRadius:20}}
      style={{height:hp(5) , marginBottom:2 , zIndex:1}}
    />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent:"space-around",
          gap: 16,
       
        }}
      >
        <TouchableOpacity>
          <AntDesign name="stepbackward" size={44} color={Colors.iconPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setPause((prev)=>!prev)}>
  {pause ? (
    <Ionicons
      name="play-circle-outline"
      size={48}
      color={Colors.iconPrimary}
    />
  ) : (
    <Ionicons
      name="pause-circle-outline"
      size={48}
      color={Colors.iconPrimary}
    />
  )}
</TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="stepforward" size={44} color={Colors.iconPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginLeft: 60,
  },
});