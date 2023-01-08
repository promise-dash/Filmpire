import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { MdMovie } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetActorInfoQuery, useGetMoviesByActorsIdQuery } from "../services/TMDB.js";
import Movie from './Movie.jsx';
import Pagination from './Pagination.jsx';

const Actors = () => {

  const [page, setPage] = useState(1);

  const {id} = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetActorInfoQuery(id);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

  const birthDate = new Date(data?.birthday);
  const month = birthDate.toLocaleString('default', { month: 'short' });
  const formatedDate = month + ' ' + data?.birthday.substring(8, 10) + ' ' + data?.birthday.substring(0,4);

  const {data: movies} = useGetMoviesByActorsIdQuery({actor_id: id, page: page});

  if(isFetching){
    return (
      <div className='flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div  className='px-8 pt-5'>
      <div className='flex'>
        <div className='flex basis-2/6 justify-start'>
            <img src={`${imageBaseUrl}${data?.profile_path}`} alt={`${data?.name}`} 
            className='h-[26rem] rounded-2xl shadow-[10px_10px_11px_rgba(0,0,0,0.6)]'/>
        </div>
        <div className='flex flex-col basis-4/6'>
          <h2 className='text-[3rem]'>{data?.name}</h2><br />
          <p><span className='text-xl'>Born: </span> {formatedDate}</p>
          <br />
          <small className='text-xs'>{data?.biography}</small>
          <br />
          <div className='flex items-center justify-around'>
            <button className='flex gap-1 items-center justify-center px-5 py-1.5 text-white bg-[#1976D2] text-base rounded-sm'>
                  <a href={`https://www.imdb.com/name/${data?.imdb_id}`} target="blank" rel="noopener noreferrer">Imdb</a>
                  <MdMovie className='text-base text-white'/>
            </button>
            <button className='flex gap-1 items-center justify-center px-5 py-1.5 text-white bg-[#1976D2] text-base rounded-sm'>
                  <BiArrowBack className='text-base text-white'/>
                  <button onClick={() => navigate(-1)}>Back</button>
            </button>
          </div>
        </div>
      </div>
      <br /><br />
      <h4 className='text-center text-4xl'>Movies</h4><br />
      <div className='grid grid-cols-6 px-8 gap-6 flex-wrap pt-5'>
        {movies?.results.slice(0,12)?.map((movie, i) => {
          return (
            movie.poster_path && <Movie movie={movie} key={i} i={i}/>
          )
        })}
      <br />
    </div>
    <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </div>
  )
}

export default Actors