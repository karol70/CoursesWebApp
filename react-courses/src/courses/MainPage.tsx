import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { categoriesDTO } from "../categories/categories.model";
import CategoriesList from "../categories/CategoriesList";
import { urlCourseCategories, urlPrivateLessonsCategories } from "../endpoints";

export default function  MainPage(){
    const [privateLessonCategories, setPrivateLessonCategories] = useState<categoriesDTO[]>([]);
    const [courseCategories, setCourseCategories] = useState<categoriesDTO[]>([]);

   useEffect(() => {
      axios.get(urlCourseCategories)
      .then((response: AxiosResponse<categoriesDTO[]>) =>{
        setCourseCategories(response.data);
      })   
   },[]);
   
   useEffect(() => {
    axios.get(urlPrivateLessonsCategories)
      .then((response: AxiosResponse<categoriesDTO[]>) =>{
        setPrivateLessonCategories(response.data);
      })  
    },[]);


   
  return(
    
    <div className='container'>
    <h3>Kategorie Kursów i Szkoleń</h3>
    <CategoriesList categories={courseCategories} path="courses"/>
    <h3>Kategorie Korepetycji</h3>
    <CategoriesList categories={privateLessonCategories} path="privateLessons"/>
  </div>
  )
}