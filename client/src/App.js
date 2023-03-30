import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/HomePage/HomePage';
import Detail from './Components/DetailPage/DetailPage';
import Form from './Components/FormPage/FormPage';
 

function App() {
  return (
    <div> 
      <Routes>
        <Route path='/' element= {<LandingPage/>} />
        <Route path='/home' element= {<Home/>} />
        <Route path='/dogs/detail/:id' element= {<Detail/>} />
        <Route path='/form' element= {<Form/>} />
      </Routes>
    </div>

  );
}
export default App;    