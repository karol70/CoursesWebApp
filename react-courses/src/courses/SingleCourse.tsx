import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlCourses } from "../endpoints";
import Ratings from "../utils/Ratings";
import { courseDTO } from "./courses.model";
import css from './Courses.module.css';

export default function SingleCourse(props: courseDTO){
    const buildLink = () => `/course/${props.id}`;
    const [course, setCourse] = useState<courseDTO>();

    useEffect(()=>{
        axios.get(`${urlCourses}/${props.id}`)
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
                : <img alt="img" src ="https://the1thing.com/wp-content/uploads/2015/01/the_one_thing_improve_skills.jpg"/>}
                <p>{props.name}</p>
                <p>{props.type}</p>  
            </Link>
            {viewRatingStars()} ({course?.averageVote})                   
        </div>
    )
}