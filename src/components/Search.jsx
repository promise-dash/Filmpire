import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { assignSearchQuery } from '../features/currentGenreOrCategory';

const Search = () => {

    const {mode} = useSelector((state) => state.theme); 
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(assignSearchQuery(searchTerm));
        navigate('/');
    }
  return (
    <form 
      onSubmit={handleSubmit}
      className={`${mode==='dark' ? 'bg-[#373737da]':'bg-[#5ea5eda1]'} flex items-center justify-center gap-1 cursor-pointer px-3 py-2 rounded-3xl lg:px-10 lg:py-3`}>
        <BsSearch className='text-sm cursor-pointer'/>
        <input type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='bg-transparent outline-none ml-2 border-b-2' placeholder='Search'/>
    </form>
  )
}

export default Search