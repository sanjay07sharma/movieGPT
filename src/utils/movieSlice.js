import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: { addNowPlayingMovie : null },
    reducers: {
        addNowPlayingMovie: (state, action) => {
            state.addNowPlayingMovie = action.payload;
        },
        removeMovie: (state) => {
            state.addNowPlayingMovie = null;
        },
    },
});

export const { addNowPlayingMovie } = movieSlice.actions;
export default movieSlice.reducer;
