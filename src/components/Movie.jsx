import React from 'react';
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';

const Movie = ({ movie, i}) => {

  const {mode} = useSelector((state) => state.theme);
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

  return (
    <Link key={i} to={`/movie/${movie?.id}`} className='flex flex-col items-center gap-1 transition ease-in-out hover:scale-105'>
        <img src={movie?.poster_path ?  `${imageBaseUrl}${movie?.poster_path}` : "https://www.fillmurray.com/200/300"} alt={movie.title} className='rounded-2xl'/>
        <p className='2xl:text-xl'>{movie?.title.length >17 ? movie?.title.substring(0,15)+"..." : movie?.title}</p>
        <Rating readOnly value={movie?.vote_average /2} precision={0.1} size={'small'} style={{border: mode==='dark'? 'gray': ''}}/>
    </Link>
  )
}

export default Movie