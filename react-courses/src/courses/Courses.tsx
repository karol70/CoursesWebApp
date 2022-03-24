import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import { urlCities, urlCourseCategories, urlTypes } from "../endpoints";
import Button from "../utils/Button";
import { courseDTO } from "./courses.model";
import CoursesList from "./CoursesList";

export default function Curses(){

    const [courses, setCourses] = useState<courseDTO[]>([]);
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    const [categories, setCategories] = useState<categoriesDTO[]>([]);
    const [types,setTypes] = useState<typesDTO[]>([]);
    const [cities,setCities] = useState<citiesDTO[]>([]);

    useEffect(() => {
        axios.get(urlCourseCategories)
          .then((response: AxiosResponse<categoriesDTO[]>) =>{
            setCategories(response.data);
          })  
        },[]);

    useEffect(() => {
        axios.get(urlTypes)
            .then((response: AxiosResponse<typesDTO[]>) =>{
            setTypes(response.data);
            })  
        },[]);

     useEffect(() => {
        axios.get(urlCities)
            .then((response: AxiosResponse<citiesDTO[]>) =>{
            setCities(response.data);
            })  
        },[]);

    const initialValues: filterCoursesForm = {
        categoryId: 0,
        title: '',
        type: 'type',
        city: 'city',
    }

      useEffect(() => {

        if (query.get('title')){
            
            initialValues.title = query.get('title')!;
           
        }

        if (query.get('categoryId')){
            initialValues.categoryId = parseInt(query.get('categoryId')!, 10);
            
        }

        if (query.get('type')){
            initialValues.type = query.get('type')!;
            
        }

        if (query.get('city')){
            initialValues.city =  query.get('city')!;
            
        }


    }, [])

    function modifyURL(values: filterCoursesForm){
        const queryStrings: string[] = [];

        if (values.title){
            queryStrings.push(`title=${values.title}`);
        }

        if (values.categoryId !== 0){
            queryStrings.push(`categoryId=${values.categoryId}`);
        }

        if (values.type){
            queryStrings.push(`type=${values.type}`);
        }

        if (values.city){
            queryStrings.push(`city=${values.city}`);
        }
    
        
        navigate(`/courses?${queryStrings.join('&')}`);
    }

    return(
        <div className='container mt-3'>
            <h3>Filtry:</h3>      
        <Formik initialValues={initialValues}
         onSubmit={values => {
             console.log(values);
             modifyURL(values);
            }}
         >
            {(formikProps) => (               
                    <Form>
                        <div className="row gx-3 align-items-center">
                            <div className="col-auto">
                                <label>Słowo kluczowe:</label>
                                <input type="text" className="form-control" id="title"
                                placeholder="Title of the course"
                                {...formikProps.getFieldProps("title")}
                                />
                            </div>
                            <div className="col-auto">
                                <label>Kategoria:</label>
                                <select className="form-select categories"
                                {...formikProps.getFieldProps("categoryId")}
                                >
                                    <option value="0">Wszystkie kategorie</option> 
                                     {categories.map(category=> <option key={category.id} value={category.id}>{category.name}</option>)} 
                                </select>
                            </div>
                            <div className="col-auto">
                                <label>Tryb szkolenia:</label>
                                <select className="form-select"
                                {...formikProps.getFieldProps("type")}
                                >    
                                    <option value="0">Wszystkie typy</option>                               
                                    {types.map(type=> <option key={type.id} value={type.id}>{type.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                <label>Miasto:</label>
                                <select className="form-select"
                                {...formikProps.getFieldProps("city")}
                                >
                                    <option value="0">Wybierz miasto</option>
                                    {cities.map(city=> <option key={city.id} value={city.id}>{city.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                    <Button className="btn btn-primary"
                                        onClick={() => formikProps.submitForm()}
                                    >Filtruj</Button>
                                    <Button className="btn btn-danger ms-3"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);                                     
                                        }}
                                    >Wyczyść</Button>
                                </div>
                        </div>
                    </Form>               
            ) }
        </Formik>
    
        <h3 className="mt-3">Kursy i Szkolenia</h3>
        <CoursesList courses={courses}/>
    </div>
  
    )
}

interface filterCoursesForm{
    categoryId: number;
    title: string;
    type: string;
    city: string;
}