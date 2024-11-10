import { recommendedSongs } from "./Songs";
import { Newrealses } from "./Songs";
import { Public_choice } from "./Songs";
 export interface Song {
  url: string;
  title: string;
  artist: string;
  artwork: string;
}
export interface SongCategory {
  title: string;
  songs: Song[];
}
export const songsWithCategory:SongCategory[] = [
  {
    title: "Recommended for you",
    songs: recommendedSongs
  },
  {
    title: "New Releases",
    songs: Newrealses,
  },
  {
  title: "Public Choice",
    songs: Public_choice,
  },

];
