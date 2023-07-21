import React from 'react'
import Movie from './Movie'

const RatedCards = ({title, data}) => {
  return (
    <div>
        <h5>{title}</h5>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-8 gap-6 flex-wrap pt-5'>
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