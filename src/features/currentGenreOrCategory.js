import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
        },
        assignSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
})

export const { selectGenreOrCategory, assignSearchQuery } = genreOrCategory.actions;

export default genreOrCategory.reducer;
