import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: { addNowPlayingMovie : null, trailer: null },
    reducers: {
        addNowPlayingMovie: (state, action) => {
            state.addNowPlayingMovie = action.payload;
        },
        removeMovie: (state) => {
            state.addNowPlayingMovie = null;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
    },
});

export const { addNowPlayingMovie, addTrailer } = movieSlice.actions;
export default movieSlice.reducer;
