import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Authorized from "../auth/Authorized";
import { urlCourses, urlRatings } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";

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

   

   async function handleRate(rate: number){
       await axios.post(urlRatings, {rating: rate, courseId: id}).then(() => {
            Swal.fire({icon: 'success', title: 'Dodano ocenę'})
        })
    }

    return(
        course? <div className="container mt-4" style={{display: 'flex'}}>
                
            <div className={css.left}> 
            
            <h3>{course.name}</h3>
                {course.image? <img alt="img" src={course.image}/>
                : <img alt="img" src ="https://the1thing.com/wp-content/uploads/2015/01/the_one_thing_improve_skills.jpg"/>}
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
 
        </div> : <Loading/>
    )
}   