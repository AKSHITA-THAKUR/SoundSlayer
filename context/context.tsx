import { createContext } from "react";
import { Audio } from "expo-av";
interface SongInfo {
  imageUrl: string;
  artist: string;
  songTitle: string;
  songUrl: string;
}

interface CurrentSongContextType {
  Playing: SongInfo;
  setPlaying: React.Dispatch<React.SetStateAction<SongInfo>>;
  positionMillis: number; 
  setPositionMillis: React.Dispatch<React.SetStateAction<number>>; 
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

}

export const currentSongContext = createContext<CurrentSongContextType>({
  Playing: {
    imageUrl: "",
    artist: "",
    songTitle: "",
    songUrl: ""
  },
  setPlaying: () => {} ,
  positionMillis: 0, 
  setPositionMillis: () => {} ,
  isPlaying: false,  
  setIsPlaying: () => {},

});
