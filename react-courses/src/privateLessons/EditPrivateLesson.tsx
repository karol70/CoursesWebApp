import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CourseForm from "../courses/CourseForm";
import { courseCreationDTO, courseDTO } from "../courses/courses.model";
import { urlPrivateLessons } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";
import Loading from "../utils/Loading";

export default function EditPrivateLesson(){
    const {id}: any = useParams();
    const [privateLesson, setPrivateLesson] = useState<courseCreationDTO>();
    const [privateLessonPutGet, setPrivateLessonPutGet] = useState<courseDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${urlPrivateLessons}/PutGet/${id}`)
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
            setPrivateLesson(model);
            setPrivateLessonPutGet(response.data);
        })
    }, [id])


    async function edit(privateLessonsToEdit: courseCreationDTO){
        try{
            const formData = convertCourseToFormData(privateLessonsToEdit);
            await axios({
                method: 'put',
                url: `${urlPrivateLessons}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}               
            })
            Swal.fire({icon: 'success', title: 'Korepetycja została edytowana'})
            history.push(`/privateLessons`);
            
        } catch (error :any){
            if(error && error.response){
                setErrors(error.response.data)
            }
        }
    }
    return( 
    <div className="container mt-3">
            <DisplayErrors errors={errors}/>           
            {privateLesson && privateLessonPutGet? <CourseForm title="Edytuj korepetycję" onSubmit={async values => await edit(values)}model={privateLesson}
            />: <Loading/>}
    </div>
    )
}