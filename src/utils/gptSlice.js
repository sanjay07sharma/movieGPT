import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gtpSearch",
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        }
    },
});

// export my acction to use in my component
export const { toggleGptSearch } = gptSlice.actions;
// export my reducer to use in my store
export default gptSlice.reducer;
