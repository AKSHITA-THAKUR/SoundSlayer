import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import React from "react";
import { router } from "expo-router";
import { currentSongContext } from "@/context/context";
import { useState, useEffect, useContext } from "react";
import MovingText from "./Folder/MovingText";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Audio } from "expo-av";

const CurrentPlayer = () => {
  const {
    Playing,
    positionMillis,
    setPositionMillis,
    isPlaying,
    setIsPlaying,
  } = useContext(currentSongContext);

  const [song, setSong] = useState<any>(null);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const OpenPage = () => {
    router.push({
      pathname: "/PlayerScreen",
    });
    if (song) song.pauseAsync();
    setIsPlaying(false);
  };

  const loadAndPlaySound = async () => {
    if (song) {
      await song.unloadAsync();
    }
    setPositionMillis(0); //ADD pposition millis
    console.log("Loading Sound...");
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: Playing.songUrl },
      { shouldPlay: true, positionMillis: 0 } // Added 0 to position millis
    );
    setSong(newSound);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPositionMillis(status.positionMillis || 0);
        progress.value = status.positionMillis / (status.durationMillis || 1); // Chnage this status. position millis to position millis
      }
    });

    console.log("Playing Sound");
  };

  const togglePlayPause = async () => {
    if (!song) {
      await loadAndPlaySound();
    } else if (isPlaying) {
      await song.pauseAsync();
      setIsPlaying(false);
    } else {
      await song.playAsync();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    loadAndPlaySound();
    
    return () => {
      if (song) {
        song.unloadAsync();
      }
    };
  }, [Playing.songUrl]);

  const seekForward = async () => {
    if (song) {
      const newPosition = positionMillis + 5000;
      await song.setPositionAsync(newPosition);
      setPositionMillis(newPosition); // Update  state
    }
  };

  const seekBackward = async () => {
    if (song) {
      const newPosition = Math.max(0, positionMillis - 5000); // so that not going below 0
      await song.setPositionAsync(newPosition);
      setPositionMillis(newPosition);
    }
  };

  return (
    <View>
      <View>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          style={{ height: hp(5), marginBottom: 2, zIndex: 1 }}
        />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: "gray" }}>
        <TouchableOpacity
          onPress={OpenPage}
          style={styles.imageAndTextContainer}
        >
          <Image
            source={{ uri: Playing.imageUrl }}
            style={{ height: hp(8), width: hp(8) }}
          />
          <View style={styles.textContainer}>
            <MovingText
              text={Playing.songTitle}
              animatedThreshold={15}
              style={styles.title}
            />
            <Text style={styles.artistText}>{Playing.artist}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={seekBackward}>
            <AntDesign
              name="stepbackward"
              size={32}
              color={Colors.iconPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            {isPlaying ? (
              <Ionicons
                name="pause-circle-outline"
                size={36}
                color={Colors.iconPrimary}
              />
            ) : (
              <Ionicons
                name="play-circle-outline"
                size={36}
                color={Colors.iconPrimary}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={seekForward}>
            <AntDesign
              name="stepforward"
              size={32}
              color={Colors.iconPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CurrentPlayer;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  buttonContainer: {
    width: wp(25), // Set a fixed width for the button container
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", // Evenly space the buttons
    marginEnd: 10,
  },
  playerContainer: {
    flexDirection: "row",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    flex: 1,
  },
  textContainer: {
    padding: 10,
    overflow: "hidden",
    flex: 1,
  },

  artistText: {
    fontSize: hp(2),
    color: Colors.textSecndary,
  },
});
