import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

interface song {
  songUrl: string;
  title: string;
  artwork: string;
  artist: string;
}
interface LikedSongState {
  likedSongs: song[];
}
const initialState: LikedSongState = {
  likedSongs: [],
};
const LikeSlice = createSlice({
  name: "LikedSong",
  initialState,
  reducers: {
    addtoLike: (state, action: PayloadAction<song>) => {
      state.likedSongs.push(action.payload);
      console.log(`The song ${action.payload.title} is being liked`)
    },
    removeFromLike: (state, action: PayloadAction<string>) => {
      state.likedSongs = state.likedSongs.filter(
        (song) => song.title !== action.payload
      );
    },
  },
});

export const {addtoLike , removeFromLike} = LikeSlice.actions;
export default LikeSlice.reducer;