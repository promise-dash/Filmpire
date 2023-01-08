import React from "react";
import { Sidebar, Actors, Profile, Movies, MovieInformation, Navbar } from "./components/index.js";
import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";

function App() {
  const {mode} = useSelector((state) => state.theme);
  return (
    <div className='flex h-full' style={{backgroundColor: mode === 'dark' ? '#121212' : 'white', color: mode === 'dark' ? 'white' : 'black'}}>
      <Sidebar/>
      <main className="w-full">  
        <Navbar />
          <Routes>
            <Route path="/" exact element={<Movies/>}/>
            <Route path="/movie/:id" exact element={<MovieInformation/>}/>
            <Route path="/actors/:id" exact element={<Actors/>}/>
            <Route path="/profile/:id" exact element={<Profile/>}/>
          </Routes>
      </main>
    </div>
  );
}

export default App;
