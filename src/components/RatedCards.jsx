import React from 'react'
import Movie from './Movie'

const RatedCards = ({title, data}) => {
  return (
    <div>
        <h5>{title}</h5>
        <div className='grid grid-cols-6 px-8 gap-6 flex-wrap pt-5'>
            {data?.results.map((movie, i) => {
                return(
                  <Movie key={movie.id} movie={movie} i={i}/>
                )
            })}
        </div>
    </div>
  )
}

export default RatedCards