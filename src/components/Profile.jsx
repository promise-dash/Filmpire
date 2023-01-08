import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../features/auth'
import {BiExit} from "react-icons/bi"
import { useGetListQuery } from '../services/TMDB'
import RatedCards from './RatedCards'

const Profile = () => {

  const {user} = useSelector(userSelector);

  const {data: favoriteMovies, refetch: refetchFavorites} = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchlistMovies, refetch: refetchWatchlisted} = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  },[]);

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl'>My Profile</h3>
        <div className='flex gap-2 items-center'>
          <button className='text-inherit' onClick={logOut}>Logout</button>
          <BiExit />
        </div>
      </div>
      <br />
        {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? (<h5>Add movies to wishlist to see them here</h5>)
        :(
          <div>
            <RatedCards title='Favorite Movies' data={favoriteMovies}/>
            <br />
            <RatedCards title='Watchlist Movies' data={watchlistMovies}/>
          </div>
        )
        }
      </div>
  )
}

export default Profile