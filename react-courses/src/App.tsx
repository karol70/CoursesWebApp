import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Courses from '../src/courses/Courses';
import CourseDetails from './courses/CourseDetails';


function App() {
  
     
  return (
    <BrowserRouter >
      <Menu/> 
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/courses/:id" element={<CourseDetails/>}/>
 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
