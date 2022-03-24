import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import { urlCities, urlCourseCategories, urlCourses, urlTypes } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";
import CourseForm from "./CourseForm";
import { courseCreationDTO } from "./courses.model";

export default function CourseCreation(){

    const [categories, setCategories] = useState<categoriesDTO[]>([]);
    const [types,setTypes] = useState<typesDTO[]>([]);
    const [cities,setCities] = useState<citiesDTO[]>([]);
    const navigate = useNavigate();
    const [errors,setErrors] = useState<string[]>([]);
    

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
        
    async function create(course: courseCreationDTO)
    {   
        
        try{
            const formData = convertCourseToFormData(course);
            const response = await axios({
                method:'post',
                url:urlCourses,
                data:formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })          
            navigate(`/courses`);
        } catch (error :any){
            if(error && error.response){
                setErrors(error.response.data)
            }
        }
    }

    return(
        <div className="container mt-3">
            <DisplayErrors errors={errors}/>
            <CourseForm onSubmit={async values => await create(values)}
            model={{cityId:'0', typeId:'0', categoryId:'0' ,title: '', description: '', plan:'', contactEmail:'', contactTelephoneNumber:''
            , mainPage:'',price:""}}
            categories={categories} cities={cities} types={types}
            />
        </div>
    )
}