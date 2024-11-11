import { createContext } from "react";

interface SongInfo {
  imageUrl: string;
  artist: string;
  songTitle: string;
  songUrl: string;
}

interface CurrentSongContextType {
  Playing: SongInfo;
  setPlaying: React.Dispatch<React.SetStateAction<SongInfo>>;
}

export const currentSongContext = createContext<CurrentSongContextType>({
  Playing: {
    imageUrl: "",
    artist: "",
    songTitle: "",
    songUrl: ""
  },
  setPlaying: () => {} 
});
