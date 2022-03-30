import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import { urlCities, urlCourseCategories, urlCourses, urlTypes } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";
import CourseForm from "./CourseForm";
import { courseCreationDTO } from "./courses.model";

export default function CourseCreation(){

    const history = useHistory();
    const [errors,setErrors] = useState<string[]>([]);
     
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
            history.push(`/courses`);
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
            model={{cityId:0, typeId:0, categoryId:0 ,title: '', description: '', plan:'', contactEmail:'', contactTelephoneNumber:''
            , mainPage:'',price:""}}           
            />
        </div>
    )
}