import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Authorized from "../auth/Authorized";
import { urlCourseComments, urlCourses, urlRatings } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import { courseDetailsDTO, courseDTO } from "./courses.model";
import css from './CoursesDetails.module.css';
import Comment from '../comments/Comment';
import { Form, Formik } from "formik";
import TextField from "../forms/TextField";
import CommentField from "../forms/CommentField";
import CommentsList from "../comments/CommentsList";
import { commentCreationDTO, commentDTO } from "../comments/comment.model";
import DisplayErrors from "../utils/DisplayErrors";
import * as Yup from 'yup';
import courseLogo from '../images/courses.png'

import AuthenticationContext from "../auth/AuthenticationContext";


export default function CourseDetails(){

    const{id}:any = useParams();
    const [course, setCourse] = useState<courseDTO>();
    const history = useHistory();
    const [errors,setErrors] =useState<string[]>([]);
    const {claims} = useContext(AuthenticationContext);
    const [comments,setComments] = useState<commentDTO[]>([]);

    function getUserName():string{
        return claims.filter(x=>x.name ==='userName')[0]?.value;
    }

    async function createComment(content: string)
    {   
        try{
            await axios.post(urlCourseComments,{courseId: id, date: new Date(), content: content, userName:getUserName()}).then(()=> {
                Swal.fire({icon: 'success', title: 'Komentarz został dodany'}).then(function(){window.location.reload()});
                history.push(`/course/${id}`); 
            })      
        } catch (error :any){
            if(error && error.response){
                setErrors(error.response.data)
            }
        }
    }

    useEffect(()=>{
        axios.get(`${urlCourses}/${id}`)
        .then((response: AxiosResponse<courseDTO>) =>{   
            setCourse(response.data);        
            })
            
    },[id])

    useEffect(()=>{
        axios.get(`${urlCourseComments}/${id}`)
        .then((response: AxiosResponse<commentDTO[]>) =>{   
            setComments(response.data);        
            })
            
    },[id])

   

   async function handleRate(rate: number){
       await axios.post(urlRatings, {rating: rate, courseId: id}).then(() => {           
            Swal.fire({icon: 'success', title: 'Dodano ocenę'}).then(function(){window.location.reload()});           
        });
    }

    return(
        <>
        {course? <div className="container mt-4" style={{display: 'flex'}}>
                
            <div className={css.left}> 
            
            <h3>{course.name}</h3>
                {course.image? <img alt="img" src={require(course.image)}/>
                : <img alt="img" src ={courseLogo}/>}
               <div> Dodaj ocenę:<Ratings maximumValue={5} selectedValue={course.userVote} onChange={handleRate}/>({course.averageVote})</div>
            </div>
            
            <div className={css.right}>               

                <h4 >Opis:</h4>
                <p>{course.description}</p>            
            
                {course.plan ?<div><h4>Harmonogram:</h4>
                <p>{course.plan}</p></div>: null}        
            
                <h4>Tryb i forma szkolenia:</h4>
                <p>{course.type.name}</p> 

                {course.price? <div><h4>Cena:</h4>
                <p>{course.price} PLN</p></div> :null}      
            
                <h4>Email:</h4>
                <p>{course.contactEmail}</p>

                {course.contactNumber? <div><h4>Telefon:</h4>
                <p>{course.contactNumber}</p></div> :null} 

            
                {course.courseHomePage? <div><h4>Więcej na naszej stronie:</h4>
                <a href={course.courseHomePage} target="_blank">{course.courseHomePage}</a></div> :null}

            </div>
            
        </div> : <Loading/>}
        {course? <div className="container mt-4" style={{display: 'flex'}}>
            {comments? <div className={css.leftcomment}>
                <CommentsList comments={comments}/> 
            </div> : <p>Brak komentarzy</p>}
            
        <div className={css.right}>
        <Formik
             initialValues={{courseId: '', content:'', date:''}}       
             onSubmit = {(formikProps)=>createComment(formikProps.content)}
                validationSchema ={Yup.object({
                    content: Yup.string().required('To pole jest wymagane, jeżeli chcesz dodać komentarz')
             })}
        >
        {(formikProps) => (
            <Form>       
                <CommentField/>
                <Button disabled={formikProps.isSubmitting} type='submit'>Opublikuj</Button>
            </Form>
        )}
        </Formik>
        <DisplayErrors errors={errors}/>
        </div>
        </div> : null}

        </>
    )
}   