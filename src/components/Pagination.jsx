import React from 'react'

const Pagination = ({currentPage, setPage, totalPages}) => {

    const handlePrev = () => {
        if(currentPage > 1){
            setPage((prevPage) => prevPage - 1);
        }
    }
    const handleNext = () => {
        if(currentPage !== totalPages){
            setPage((prevPage) => prevPage + 1);
        }
    }
  return (
   <>
     <div className='flex items-center justify-around'>
        <button className='flex gap-1 items-center justify-center px-5 py-1.5 text-white bg-[#1976D2] text-base rounded-sm' onClick={handlePrev}>Prev</button>
        <p>{currentPage}</p>
        <button className='flex gap-1 items-center justify-center px-5 py-1.5 text-white bg-[#1976D2] text-base rounded-sm' onClick={handleNext}>Next</button>
    </div>
    <br />
   </>
  )
}

export default Pagination