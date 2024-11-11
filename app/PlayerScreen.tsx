import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { currentSongContext } from "@/context/context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const PlayerScreen = () => {
  const { Playing } = useContext(currentSongContext);
  const [pause, setPause] = useState<boolean>(true);
  const [liked, isLiked] = useState<boolean>(false);
  const [Sound, setSound] = useState<any>(null);

  const [durationMillis, setDurationMillis] = useState<number>(0);
  const [positionMillis, setPositionMillis] = useState<number>(0);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const playSound = async () => {
    if (Sound) {
      await Sound.playAsync();
    } else {
      console.log("Loading Sound...");
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: Playing.songUrl },
        { shouldPlay: true }
      );
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDurationMillis(status.durationMillis || 0);
          setPositionMillis(status.positionMillis || 0);
          progress.value = status.positionMillis / (status.durationMillis || 1);
        }
      });

      console.log("Playing Sound");
    }
  };

  const togglePlayPause = async () => {
    if (pause) {
      await playSound();
    } else if (Sound) {
      await Sound.pauseAsync();
    } else {
      await playSound();
    }
    setPause(!pause);
  };

  useEffect(() => {
    return Sound
      ? () => {
          console.log("unloading the sound");
          Sound.unloadAsync();
        }
      : undefined;
  }, [Sound]);

  // Function to format time from milliseconds to minute and second format
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Playing Now</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Image
          style={{ height: hp(40), width: wp(70), borderRadius: 20 }}
          source={{ uri: Playing.imageUrl }}
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
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.textPrimary,
              fontWeight: "700",
            }}
          >
            {Playing.songTitle}
          </Text>
          <Text style={{ fontSize: 20, color: Colors.textSecndary }}>
            {Playing.artist}
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

      <View style={{ padding: 20, marginTop: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: Colors.textSecndary }}>
            {formatTime(positionMillis)}
          </Text>
          <Text style={{ color: Colors.textSecndary }}>
            {formatTime(durationMillis)}
          </Text>
        </View>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          containerStyle={{ height: 10, borderRadius: 20 }}
          style={{ height: hp(5), marginBottom: 2, zIndex: 1, marginTop: 20 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-around",
          gap: 16,
        }}
      >
        <TouchableOpacity>
          <AntDesign name="stepbackward" size={44} color={Colors.iconPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
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
