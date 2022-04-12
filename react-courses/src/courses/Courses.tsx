import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { request } from "http";
import { useEffect, useState } from "react";
import {  useLocation, useHistory } from "react-router-dom";
import { forEachChild } from "typescript";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import { urlCities, urlCourseCategories, urlCourses, urlTypes } from "../endpoints";
import Button from "../utils/Button";
import { courseDTO } from "./courses.model";
import CoursesList from "./CoursesList";

export default function Curses(){

    const [courses, setCourses] = useState<courseDTO[]>([]);
    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

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

        useEffect(() => {
            axios.get(urlCourses)
                .then((response: AxiosResponse<courseDTO[]>) =>{
                setCourses (response.data);
                })  
            },[]);   
    

    const initialValues: filterCoursesForm = {
        categoryId: 0,
        title: '',
        typeId: 0,
        cityId: 0,
    }

      useEffect(() => {

        if (query.get('name')){            
            initialValues.title = query.get('name')!;           
        }

        if (query.get('categoryId')){
            initialValues.categoryId = parseInt(query.get('categoryId')!, 10);
              
        }

        if (query.get('typeId')){
            initialValues.typeId = parseInt(query.get('typeId')!,10);
            
        }

        if (query.get('cityId')){
            initialValues.cityId =  parseInt(query.get('cityId')!,10);           
        }
        searchCourses(initialValues); 

    }, [])

    function modifyURL(values: filterCoursesForm){
        const queryStrings: string[] = [];

        if (values.title){
            queryStrings.push(`title=${values.title}`);
        }

        if (values.categoryId !== 0){
            queryStrings.push(`categoryId=${values.categoryId}`);
        }

        if (values.typeId){
            queryStrings.push(`typeId=${values.typeId}`);
        }

        if (values.cityId){
            queryStrings.push(`cityId=${values.cityId}`);
        }
    
        history.push(`/courses?${queryStrings.join('&')}`);
        
        
    }

    function searchCourses(values: filterCoursesForm){
        modifyURL(values);
        axios.get(`${urlCourses}/filter`, {params: values})
        .then((response: AxiosResponse<courseDTO[]>)=>{
            setCourses(response.data);
        })
    }

    return(
        <div className='container mt-3' >
            <h3>Filtry:</h3>      
        <Formik initialValues={initialValues}
         onSubmit={values => {
             searchCourses(values);
            }}
         >
            {(formikProps) => (               
                    <Form>
                        <div className="row gx-3 align-items-center">
                            <div className="col-auto">
                                <label>Słowo kluczowe:</label>
                                <input type="text" className="form-control" id="title"                               
                                {...formikProps.getFieldProps("title")}
                                />
                            </div>
                            <div className="col-auto">
                                <label>Kategoria:</label>
                                <select className="form-select categories" id="categoryId"
                                {...formikProps.getFieldProps("categoryId")}
                                >
                                    <option value="0">Wszystkie kategorie</option> 
                                     {categories.map(category=> <option key={category.id} value={category.id}>{category.name}</option>)} 
                                </select>
                            </div>
                            <div className="col-auto">
                                <label>Tryb szkolenia:</label>
                                <select className="form-select" id="typeId"
                                {...formikProps.getFieldProps("typeId")}
                                >    
                                    <option value="0">Wszystkie typy</option>                               
                                    {types.map(type=> <option key={type.id} value={type.id}>{type.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                <label>Miasto:</label>
                                <select className="form-select" id="cityId"
                                {...formikProps.getFieldProps("cityId")}
                                >
                                    <option value="0">Wybierz miasto</option>
                                    {cities.map(city=> <option key={city.id} value={city.id}>{city.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto mt-4">
                                    <Button className="btn btn-primary"
                                        onClick={() => formikProps.submitForm()}
                                    >Filtruj</Button>
                                    <Button className="btn btn-danger ms-3"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);
                                            searchCourses(initialValues);                                     
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
    title?: string;
    typeId: number;
    cityId: number;
}

