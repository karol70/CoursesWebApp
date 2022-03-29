import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { urlCourses } from "../endpoints";
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import { courseDetailsDTO, courseDTO } from "./courses.model";
import css from './CoursesDetails.module.css';

export default function CourseDetails(){

    const{id}: any = useParams();
    const [course, setCourse] = useState<courseDTO>();

    useEffect(()=>{
        axios.get(`${urlCourses}/${id}`)
        .then((response: AxiosResponse<courseDTO>) =>{
            setCourse(response.data);
            }) 
    },[id])

    return(
        course? <div className="container mt-4" style={{display: 'flex'}}>
                
            <div className={css.left}> 
            <h3>{course.name}</h3>
                {course.image? <img alt="img" src={course.image}/>
                : <img alt="img" src ="https://the1thing.com/wp-content/uploads/2015/01/the_one_thing_improve_skills.jpg"/>}
                
            </div>
            
            <div className={css.right}>
                <Ratings maximumValue={5} selectedValue={0} onChange={()=>{}}/>

                <h5 >Opis:</h5>
                <p>{course.description}</p>            
            
                {course.plan ?<div><h5>Harmonogram:</h5>
                <p>{course.plan}</p></div>: null}        
            
                <h5>Tryb i forma szkolenia:</h5>
                <p>{course.type.name}</p>       
            
                <h5>Email:</h5>
                <p>{course.contactEmail}</p>

                {course.contactNumber? <div><h5>Telefon:</h5>
                <p>{course.contactNumber}</p></div> :null}        
            
                {course.mainPage? <div><h5>Więcej na naszej stronie:</h5>
                <p>{course.mainPage}</p></div> :null}
            </div>
            

        </div> : <Loading/>
    )
}   