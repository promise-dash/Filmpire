import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Banner = ({movies}) => {
  // const[index, setIndex] = useState(0);
  
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original//';
    let randomIndex = (Math.floor(Math.random())*20);

    // useEffect(() => {
    //   const imageSlider = () => {
    //     setInterval(())
    //   }

    //   imageSlider();
    // }, []);
  return (
    <div className='hidden md:block relative px-8 pt-5'>
        <Link to={`/movie/${movies[randomIndex].id}`} className='relative'>
            <div className='w-full h-[25rem] rounded-lg 2xl:h-[35rem]' 
            style={{backgroundImage: `url(${imageBaseUrl}${movies[randomIndex].backdrop_path})`, backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className='absolute top-0 right-0 w-full h-full bg-[#0000008c] background-blend-darken rounded-lg'></div>
            <dir className='absolute bottom-5 max-w-[27rem] text-white leading-3'>
                <span className='text-xl mb-2'>{movies[randomIndex].title}</span><br /><br />
                <small className='sm text-xs'>{movies[randomIndex].overview}</small>
            </dir>
        </Link>
    </div>
  )
}

export default Banner;