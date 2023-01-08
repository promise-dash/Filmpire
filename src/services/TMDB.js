import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        }),

        getMoviesByActorsId: builder.query({
            query: ({actor_id, page}) => `discover/movie?with_cast=${actor_id}&page=${page}&api_key=${tmdbApiKey}`
        }),

        getActorInfo: builder.query({
            query: (actor_id) => `person/${actor_id}?api_key=${tmdbApiKey}`
        }),

        getMovieRecommendations: builder.query({
            query: ({movie_id, list}) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),
        //get movieInformation
        getMovieInfo: builder.query ({
            query : (movie_id) => `movie/${movie_id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        //Get genres
        getGenres: builder.query ({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //Get movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                else if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                else if(searchQuery){
                    return `search/movie?api_key=${tmdbApiKey}&page=${page}&query=${searchQuery}`;
                }
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
    }),

});

export const {
    useGetMoviesQuery, useGetGenresQuery, useGetMovieInfoQuery, useGetListQuery, 
    useGetMovieRecommendationsQuery, useGetActorInfoQuery, useGetMoviesByActorsIdQuery
} = tmdbApi;