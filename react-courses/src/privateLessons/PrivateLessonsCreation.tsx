import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import CourseForm from "../courses/CourseForm";
import { courseCreationDTO } from "../courses/courses.model";
import { urlPrivateLessons } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";

export default function PrivateLessonCreation(){
    const history = useHistory();
    const [errors,setErrors] = useState<string[]>([]);
       
    async function create(course: courseCreationDTO)
    {   
        
        try{
            const formData = convertCourseToFormData(course);
            const response = await axios({
                method:'post',
                url:urlPrivateLessons,
                data:formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            Swal.fire({icon: 'success', title: 'Kurs został dodany'})          
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
            <CourseForm title="Utwórz korepetycje" onSubmit={async values => await create(values)}
            model={{cityId:0, typeId:0, categoryId:0 ,title: '', description: '', plan:'', contactEmail:'', contactTelephoneNumber:""
            , courseHomePage:'',price:""}}           
            />
        </div>
    )
}