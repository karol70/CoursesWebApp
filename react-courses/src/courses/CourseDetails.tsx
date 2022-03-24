import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import { courseDTO } from "./courses.model";
import css from './CoursesDetails.module.css';

export default function CourseDetails(){

    const{id}: any = useParams();
    const [course, setCourse] = useState<courseDTO>();

    return(
        course? <div className="container mt-3" style={{display: 'flex'}}>
            <div className={css.left}> 
                <h3>{course.title}</h3>
                <img alt="img" src={course.image}/>
            </div>
            
            <div className={css.right}>
                <Ratings maximumValue={5} selectedValue={0} onChange={()=>{}}/>

                <h5 >Opis:</h5>
                <p>{course.description}</p>            
            
                <h5>Harmonogram:</h5>
                <p>{course.plan}</p>        
            
                <h5>Tryb i forma szkolenia:</h5>
                <p>{course.type}</p>       
            
                <h5>Kontakt:</h5>
                <p>{course.contact}</p>         
            
                <h5>Więcej na naszej stronie:</h5>
                <p>{course.mainPage}</p>
            </div>
            

        </div> : <Loading/>
    )
}   