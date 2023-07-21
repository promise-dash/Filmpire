import { CircularProgress } from '@mui/material';
import React from 'react'
import {Link} from "react-router-dom"
import { useGetGenresQuery } from '../services/TMDB';
import genreIcons from '../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';

const Sidebar = () => {
  const dispatch = useDispatch();
  const {mode} = useSelector((state) => state.theme);

  const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
  const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

  
  const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'}, 
  ];

  const { data, isFetching } = useGetGenresQuery();

  if(isFetching){
    return (
      <div className='flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='hidden lg:block basis-[20%] h-screen sticky top-0 overflow-y-scroll'>
      <Link to={"/"} className='flex items-center justify-center'>
        <img src={mode === 'dark' ? redLogo : blueLogo} alt="Filmpire" className='mt-5 mb-6 w-[9rem]'/>
      </Link>
      <hr style={{opacity: mode === 'dark' ? '0.2': '1'}}/>
      <div className='pt-3 pb-3'>
        <small className='p-2 text-gray-600' style={{color: mode === 'dark' ? 'gray' : ''}}>Categories</small>
        {categories.map(({label, value}, ) => {
          return (
              <Link to={"/"}>
                <div key={value} 
                 onClick={() => dispatch(selectGenreOrCategory(value))} 
                 className={`flex items-center gap-5 p-2 px-4 text-sm ${mode === 'dark' ? 'hover:bg-[#2727279a]' : 'hover:bg-gray-300'} hover:bg-opacity-[0.5]`}>
                  <img src={genreIcons[label.toLowerCase()]} className='w-[25px] 2xl:w-[37px]' alt="" style={{filter: mode === 'dark' ? 'invert(100%)' : ''}}/>
                  <span className='text-[14px] 2xl:text-[21px]'>{label}</span>
                </div>
              </Link>
          )
        })}
      </div>
      <hr style={{opacity: mode === 'dark' ? '0.2': '1'}}/>
      <div className='pt-3 pb-3'>
        <small className='p-2 text-gray-600' style={{color: mode === 'dark' ? 'gray' : ''}}>Genres</small>
        {data.genres.map(({name, id}, ) => {
          return (
             <Link to={"/"}>
                <div key={id} 
                onClick={() => dispatch(selectGenreOrCategory(id))}
                className={`flex items-center gap-5 p-2 px-4 text-sm ${mode === 'dark' ? 'hover:bg-[#2727279a]' : 'hover:bg-gray-300'} hover:bg-opacity-[0.5]`}>
                  <img src={genreIcons[name.toLowerCase()]} className='w-[25px] 2xl:w-[37px]' alt="" style={{filter: mode === 'dark' ? 'invert(100%)' : ''}}/>
                  <span className='text-[14px] 2xl:text-[21px]'>{name}</span>
                </div>
             </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar