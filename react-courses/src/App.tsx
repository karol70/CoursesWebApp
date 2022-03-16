import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleCategory from './categories/SingleCategory';
import { categoriesDTO } from './categories/categories.model';
import CategoriesList from './categories/CategoriesList';
import MainPage from './MainPage';
import SingleCourse from './courses/SingleCourse';
import Courses from './courses/Courses';
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
