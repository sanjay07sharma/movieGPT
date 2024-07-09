import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gtpSearch",
    initialState: {
        showGptSearch: false,
        gptMovieResults: null,
        movieName: null,
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            state.gptMovieResults = action.payload.movieResult;
            state.movieName = action.payload.movieName;
        },
    },
});

// export my acction to use in my component
export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions;
// export my reducer to use in my store
export default gptSlice.reducer;
