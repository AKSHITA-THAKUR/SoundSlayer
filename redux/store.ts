import { configureStore } from "@reduxjs/toolkit";
import LikeSlicereducer from "../redux/LikedSlice"
 export const store = configureStore({
    reducer:{
       likedSong:LikeSlicereducer
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;