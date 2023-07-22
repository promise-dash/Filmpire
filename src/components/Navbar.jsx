import React ,{ useEffect, useState }from 'react'
import {MdAccountCircle} from "react-icons/md"
import {FiMenu} from "react-icons/fi"
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Search from './Search'
import { createSessionId, fetchToken, moviesApi } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userSelector } from '../features/auth'
import { changeTheme } from '../features/theme'

const Navbar = () => {

  const {mode} = useSelector((state) => state.theme);
  const { isAuthenticated, user} = useSelector(userSelector);
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async() => {
      if(token){
        if(sessionIdFromLocalStorage){
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);

          dispatch(setUser(userData));
        }
        else{
          const sessionId = await createSessionId();
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
        }
      }
    }

    logInUser();
  }, [token])

  const handleClick = () => {
    if(mode === 'light'){
      dispatch(changeTheme('dark'))
    }
    else{
      dispatch(changeTheme('light'))
    }
  }

  return (
    <nav className={`${mode==='dark' ? 'bg-[#272727]':'bg-[#1976D2]'} h-[60px] flex items-center justify-between text-white px-8 sticky top-0 z-30 shadow-lg`}>
      <div className='flex'>
        {/* <FiMenu className='text-lg cursor-pointer'/> */}
        {mode === 'dark' ? 
          <BsFillSunFill className='text-lg cursor-pointer' onClick={handleClick}/> : 
          <BsFillMoonFill className='text-lg cursor-pointer' onClick={handleClick}/>
        }
      </div>

      <Search />

      <div className='flex items-center justify-center gap-2 cursor-pointer'>
        { !isAuthenticated ? 
          (
            <button onClick={fetchToken} className='flex iems-center justify-center gap-2'>
              <p className='hidden md:block text-sm'>LOGIN</p>
              <MdAccountCircle className='text-xl '/>
            </button>
          ) 
          : (
            <button>
              <Link to={`/profile/${user.id}`} className='flex iems-center justify-center gap-2'>
              <p className='hidden md:block text-sm'>MY MOVIES</p>
                <MdAccountCircle className='text-xl '/>
              </Link>
            </button>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar