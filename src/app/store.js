import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer  from "../features/currentGenreOrCategory";
import userReducer  from "../features/auth";
import themeReducer from "../features/theme";

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
        theme: themeReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});