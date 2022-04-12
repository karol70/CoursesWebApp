import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { categoriesDTO } from "../categories/categories.model";
import { urlCourseCategories, urlCourses } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";
import Loading from "../utils/Loading";
import CourseForm from "./CourseForm";
import { courseCreationDTO, courseDTO } from "./courses.model";

export default function EditCourse (){

    const {id}: any = useParams();
    const [course, setCourse] = useState<courseCreationDTO>();
    const [coursePutGet, setCoursePutGet] = useState<courseDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();
    const [categories, setCategories] = useState<categoriesDTO[]>([]);
    
    useEffect(() => {
        axios.get(urlCourseCategories)
          .then((response: AxiosResponse<categoriesDTO[]>) =>{
            setCategories(response.data);
          })  
        },[]);

    useEffect(() => {
        axios.get(`${urlCourses}/PutGet/${id}`)
        .then((response: AxiosResponse<courseDTO>)=>{
            if(response.data.plan == null){response.data.plan =''}
            if(response.data.contactNumber == null){response.data.contactNumber =''}
            if(response.data.courseHomePage == null){response.data.courseHomePage =''}
            if(response.data.price == null){response.data.price =''}
            const model: courseCreationDTO={
                title: response.data.name,
                categoryId: response.data.category.id,
                typeId: response.data.type.id,
                cityId: response.data.city.id,
                description: response.data.description,
                imageURL:response.data.image,
                plan: response.data.plan,
                contactEmail: response.data.contactEmail,
                contactTelephoneNumber: response.data.contactNumber,
                courseHomePage: response.data.courseHomePage,
                price: response.data.price
            };
        
            setCourse(model);
            setCoursePutGet(response.data);
        })
    }, [id])


    async function edit(courseToEdit: courseCreationDTO){
        try{
            const formData = convertCourseToFormData(courseToEdit);
            await axios({
                method: 'put',
                url: `${urlCourses}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}               
            })
            Swal.fire({icon: 'success', title: 'Kurs został edytowany'})
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
            {course && coursePutGet? <CourseForm title="Edytuj kurs" categories={categories} onSubmit={async values => await edit(values)}model={course}
            />: <Loading/>}
    </div>
    )
}


