
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import Button from "../utils/Button";
import { courseDTO } from "./courses.model";
import CoursesList from "./CoursesList";

export default function Curses(){

    const [courses, setCourses] = useState<courseDTO[]>([]);
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    const categories: categoriesDTO[]=[{id:1,name:'IT'},{id:2,name:'Fotografia i wideo'},{id:3,name:'Motoryzacja'}];
    const types: typesDTO[]=[{id:1,name:"Online"},{id:2,name:"Stacjonarnie"},{id:3,name:"Inna forma"}];
    const cities: citiesDTO[]=[{id:1,name:"Lublin"},{id:2,name:"Warszawa"},{id:3,name:"Kraków"}];

    const initialValues: filterCoursesForm = {
        categoryId: 0,
        title: '',
        type: 'type',
        city: 'city',
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setCourses(
                [
                    {
                        id: 1,
                        title: 'C++ poziom zaawansowany',
                        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/213px-ISO_C%2B%2B_Logo.svg.png",
                        category: {
                            id: 2,
                            name: 'IT',
                            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlpGa2TlS6LoN7fv70J7H3lV_QTrqPXxQ5A&usqp=CAU',
                        },
                        type: "online",
                        city: "Lublin"
                        
                      },
                      {
                        id: 2,
                        title: 'C++ poziom zaawansowany',
                        
                        category: {
                            id: 2,
                            name: 'IT',
                            
                        },
                        type: "online",
                        city: "Lublin"
                        
                      }
                      
                ]
            )
            },1);   
        return () => clearTimeout(timerId);
      });

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
                                <input type="text" className="form-control" id="title"
                                placeholder="Title of the course"
                                {...formikProps.getFieldProps("title")}
                                />
                            </div>
                            <div className="col-auto">
                                <select className="form-select"
                                {...formikProps.getFieldProps("categoryId")}
                                >
                                    <option value="0">Kategoria</option>
                                    {categories.map(category=> <option key={category.id} value={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                <select className="form-select"
                                {...formikProps.getFieldProps("type")}
                                >
                                    <option value="0">Tryb szkolenia</option>
                                    {types.map(type=> <option key={type.id} value={type.id}>{type.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                <select className="form-select"
                                {...formikProps.getFieldProps("city")}
                                >
                                    <option value="0">Miasto</option>
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