import { CircularProgress, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetListQuery, useGetMovieInfoQuery, useGetMovieRecommendationsQuery } from '../services/TMDB';
import genreIcons from '../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import {BsGlobe,BsBookmarkHeart, BsBookmarkHeartFill} from "react-icons/bs"
import {MdMovie, MdLocalMovies} from 'react-icons/md'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import Movie from './Movie';
import axios from 'axios';
import {userSelector} from "../features/auth";

const MovieInformation = () => {
  
  const {user} = useSelector(userSelector);
  const {mode} = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useGetMovieInfoQuery(id);

  
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  
  let tralerKey =data?.videos?.results[0].key;
  data?.videos?.results?.map((video) => {
    if(video.type === "Trailer" && video.name === "New Trailer"){
      tralerKey = video.key;
    }
  }) 
  
  const releaseDate = new Date(data?.release_date);
  const month = releaseDate.toLocaleString('default', { month: 'short' });
  const formatedDate = month + ' ' + data?.release_date.substring(8, 10) + ' ' + data?.release_date.substring(0,4);
  
  const {data: recommendedMovies, isFetching: isRecommendedFetching} = useGetMovieRecommendationsQuery({movie_id: id, list: 'recommendations'});
  
  const {data: favoriteMovies} = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchlistMovies} = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);
  
  useEffect(() =>{
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() =>{
    setIsMovieWatchListed(!!watchlistMovies?.results?.find((movie) => movie.id === data?.id));
  }, [watchlistMovies, data]);


  const addToFavorite = async() => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited
    });

    setIsMovieFavorited((prev) => !prev);
  }
  const addToWatchlist = async() => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchListed
    });

    setIsMovieWatchListed((prev) => !prev);
  }

  if(isFetching){
    return (
      <div className='flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }
  if(!data){
    return(
      <div>
        <h4>Cannot load movie information <br />
        </h4>
      </div>
    )
  };


  return (
    <div className='px-10 pt-5'>
      <div className='flex'>
        <div className='flex basis-2/6 justify-start'>
          <img src={`${imageBaseUrl}${data?.poster_path}`} alt={`${data?.original_title}`} 
          className='h-[26rem] rounded-2xl shadow-[10px_10px_11px_rgba(0,0,0,0.6)] 2xl:w-[31rem] 2xl:h-[46rem]'/>
        </div>
        <div className='flex flex-col basis-4/6 pl-16'>
          <h2 className='text-center text-[2.6rem] 2xl:text-[3rem]'>{data?.original_title} ({data?.release_date.substring(0,4)})</h2>
          <h4 className='text-center text-xl mt-3 2xl:text-2xl'>{data?.tagline}</h4>
          <br /><br />
          <div className='flex items-center justify-around'>
           <div className='flex gap-2 items-center'>
            <Rating readOnly value={data?.vote_average /2} precision={0.1} size={'small'}/>
            <span className='text-sm 2xl:text-xl'>{data?.vote_average}/10</span>
           </div> 
            <span className='2xl:text-xl'>{data?.runtime} min / {formatedDate} / {data.spoken_languages[0].name}</span>
          </div>
          <br />
          <div className='flex items-center justify-evenly'>
            {data.genres.map(({id, name}) => {
              return(
                <Link to={'/'} key={id} className='flex gap-3 items-center' onClick={() => dispatch(selectGenreOrCategory(id))}>
                  <img src={genreIcons[name.toLowerCase()]} className='w-[25px] 2xl:w-[37px]' alt="" style={{filter: mode === 'dark' ? 'invert(100%)' : ''}}/>
                  <span className='text-sm 2xl:text-[21px]'>{name}</span>
                </Link>
              )
            })}
          </div>
          <br />
          <h4 className='text-xl mb-2 2xl:text-2xl 2xl:mb-4'>Overview</h4>
          <p className='text-[14px] 2xl:text-[17px]'>{data?.overview}</p>

          <br />
          <h4 className='text-xl mb-2 2xl:text-2xl 2xl:mb-4'>Top Cast</h4>
            <div className='grid grid-cols-6 overflow-x-auto'>
              {data.credits.cast.map(({id, original_name, character, profile_path}) => {
                  return(
                    profile_path && 
                    (<Link to={`/actors/${id}`} key={id}>
                        <img src={`${imageBaseUrl}${profile_path}`} alt="" className='w-[5rem] h-[6rem] object-cover rounded-xl 2xl:w-[80%] 2xl:h-[10rem]' />
                        <p className='text-sm'>{original_name}</p>
                        <small className='text-xs text-gray-600 2xl:text-sm' style={{color: mode === 'dark' ? 'gray': ''}}>{character.split('/')[0]}</small>
                      </Link>)
                  )
              }).slice(0, 6)}
            </div>
            <br />

            <div className='flex items-center justify-between'>
              <div className="grid grid-cols-3 2xl:h-[3rem] 2xl:gap-2 2xl:w-[40%]">
                <button className='flex gap-2 items-center justify-center px-2 py-1.5 border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}>
                  <a href={`${data?.homepage}`} target="blank" rel="noopener noreferrer" className='2xl:text-lg'>Website</a>
                  <BsGlobe className='text-base 2xl:text-lg'/>
                </button>
                <button className='flex gap-2 items-center justify-center px-2 py-1.5 border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}>
                  <a href={`https://www.imdb.com/title/${data?.imdb_id}`} target="blank" rel="noopener noreferrer" className='2xl:text-lg'>Imdb</a>
                  <MdMovie className='text-base 2xl:text-lg'/>
                </button>
                <button className='flex gap-2 items-center justify-center px-2 py-1.5 border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}>
                  <a href={`https://youtube.com/watch?v=${tralerKey}`} target="blank" rel="noopener noreferrer" className='2xl:text-lg'>Trailer</a>
                  <MdLocalMovies className='text-base 2xl:text-lg'/>
                </button>
              </div>

              <div className="grid grid-cols-3 2xl:h-[3rem] 2xl:gap-2 2xl:w-[40%]">
                <button className='flex gap-1 items-center justify-center p-1.5 border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}
                onClick={addToFavorite}
                >
                  <p className='2xl:text-lg'>{isMovieFavorited ? "Unfavorite" : "Favorite"}</p>
                  {isMovieFavorited ? <AiFillHeart className='text-base 2xl:text-lg'/> : <AiOutlineHeart className='text-base 2xl:text-lg'/>}
                </button>
                <button className='flex gap-1 items-center justify-center p-1.5 border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}
                onClick={addToWatchlist}
                >
                  <p className='2xl:text-lg'>Watchlist</p>
                  {isMovieWatchListed ? <BsBookmarkHeartFill className='text-base 2xl:text-lg'/> : <BsBookmarkHeart className='text-base 2xl:text-lg'/>}
                </button>
                <button className='flex gap-1 items-center justify-center border-[#1976D2] border-[1.2px] text-[#1976D2] text-sm rounded-sm' style={{color: mode === 'dark' ? 'white': '', borderColor: mode==='dark' ? 'white': ''}}>
                  <button onClick={() => navigate(-1)} className='2xl:text-lg'>Back</button>
                  <BiArrowBack className='text-base 2xl:text-lg'/>
                </button>
              </div>

            </div>   
        </div>
      </div>
      <br /><br /><br />

      <h4 className='text-center text-4xl'>You might also like</h4><br />
      {recommendedMovies ?
       (<div className='grid grid-cols-6 px-8 gap-6 flex-wrap pt-5'>
        {recommendedMovies.results.slice(0, 12).map((movie, i) => {
          return (
            movie.poster_path && <Movie movie={movie} key={i} i={i}/>
          )
        })}
      <br />
      </div>)
      : (
          <div className='flex items-center justify-center'>
            <CircularProgress />
          </div>
      )
      }
      <br />
    </div>
  )
}

export default MovieInformation;