import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseDTO } from "../courses/courses.model";
import { urlPrivateLessons } from "../endpoints";
import css from '../courses/Courses.module.css';

export default function SinglePrivateLesson(props: courseDTO){
    const buildLink = () => `/privateLesson/${props.id}`;
    const [course, setCourse] = useState<courseDTO>();

    useEffect(()=>{
        axios.get(`${urlPrivateLessons}/${props.id}`)
        .then((response: AxiosResponse<courseDTO>) =>{   
            setCourse(response.data);        
            })
            
    },[props.id])

    function viewRatingStars(){     
        return (
            <div>
                {[0,1,2,3,4].map((_, index) =>
               <FontAwesomeIcon                
                    icon="star" key={index} 
                    className={`fa-lg pointer checked`}
                /> 
                )}
            </div> 
        )
    }

    return(
        <div className={css.div}>
            <Link to={buildLink()}>
                {props.image ? 
                <img alt="img" src={props.image}/> 
                : <img alt="img" src ="https://cdn-icons-png.flaticon.com/512/1846/1846908.png"/>}
                <p>{props.name}</p>
                <p>{props.type}</p>  
            </Link>           
            {viewRatingStars()} Średnia ocen: {course?.averageVote}                   
        </div>
    )
}