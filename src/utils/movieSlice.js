import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        addNowPlayingMovie: null,
        trailer: null,
        addPopularMovies: null,
        addTopRatedMovies: null,
        addUpcomingMovies: null,
        entertainmentType: "movie", // Default value
    },
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
        addPopularMovies: (state, action) => {
            state.addPopularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.addTopRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.addUpcomingMovies = action.payload;
        },
        setEntertainmentType: (state, action) => {
            state.entertainmentType = action.payload;
        },
    },
});

export const {
    addNowPlayingMovie,
    addTrailer,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
    setEntertainmentType,
} = movieSlice.actions;
export default movieSlice.reducer;
