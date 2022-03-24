import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Courses from '../src/courses/Courses';
import CourseDetails from './courses/CourseDetails';
import CourseForm from './courses/CourseForm';
import CourseCreation from './courses/CourseCreation';
import configureValidations from './Validations';

configureValidations();


function App() {
  
     
  return (
    <BrowserRouter >
      <Menu/> 
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/courses/:id" element={<CourseDetails/>}/>
        <Route path="/courses/create" element={<CourseCreation/>}/>
 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
