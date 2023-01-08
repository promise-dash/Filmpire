import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from './Pagination';

import { useGetMoviesQuery } from '../services/TMDB'
import Movie from './Movie';
import Banner from './Banner';

const Movies = () => {

  const [page, setPage] = useState(1);
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});

  if(isFetching){
    return (
      <div className='flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }
  if(!data.results.length){
    return(
      <div>
        <h4>No movies found that match the name. <br />
        Please search something else
        </h4>
      </div>
    )
  }
  if(error){
    return "An error has occured";
  }

  return (
    <>
      <Banner movies={data?.results}/>
      <br />
      <div className='grid grid-cols-5 px-8 gap-6 pt-5 2xl:grid-cols-6'>
      {data?.results?.slice(0, 20).map((movie, i) => {
        return (
          movie.poster_path && <Movie movie={movie} key={movie.id} i={i}/>
        )
      })}
    </div>
    <br /><br />
    <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </>
  )
}

export default Movies