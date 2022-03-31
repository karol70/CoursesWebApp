import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { urlCourses, urlRatings } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import { courseDetailsDTO, courseDTO } from "./courses.model";
import css from './CoursesDetails.module.css';

export default function CourseDetails(){

    const{id}: any = useParams();
    const [course, setCourse] = useState<courseDTO>();
    const customAlert = useContext(AlertContext);
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${urlCourses}/${id}`)
        .then((response: AxiosResponse<courseDTO>) =>{   
            setCourse(response.data);        
            })
            
    },[id])

    function deleteCourse(){
            axios.delete(`${urlCourses}/${id}`)
            .then(()=> {
                customAlert()
                history.push('/courses')
            });
    }

    function handleRate(rate: number){
        axios.post(urlRatings, {rating: rate, courseId: id}).then(() => {
            Swal.fire({icon: 'success', title: 'Dodano ocenę'})
        })
    }

    return(
        course? <div className="container mt-4" style={{display: 'flex'}}>
                
            <div className={css.left}> 
            <h3>{course.name}</h3>
                {course.image? <img alt="img" src={course.image}/>
                : <img alt="img" src ="https://the1thing.com/wp-content/uploads/2015/01/the_one_thing_improve_skills.jpg"/>}
                
            </div>
            
            <div className={css.right}>
                Dodaj ocenę:<Ratings maximumValue={5} selectedValue={course.userVote} onChange={handleRate}/>({course.averageVote})

                <h5 >Opis:</h5>
                <p>{course.description}</p>            
            
                {course.plan ?<div><h5>Harmonogram:</h5>
                <p>{course.plan}</p></div>: null}        
            
                <h5>Tryb i forma szkolenia:</h5>
                <p>{course.type.name}</p> 

                {course.price? <div><h5>Cena:</h5>
                <p>{course.price} PLN</p></div> :null}      
            
                <h5>Email:</h5>
                <p>{course.contactEmail}</p>

                {course.contactNumber? <div><h5>Telefon:</h5>
                <p>{course.contactNumber}</p></div> :null} 

            
                {course.courseHomePage? <div><h5>Więcej na naszej stronie:</h5>
                <a href={course.courseHomePage} target="_blank">{course.courseHomePage}</a></div> :null}

                
            </div>
            <div>
            <Link style={{marginRight: '1rem'}} className="btn btn-info"
                    to={`/course/edit/${id}`}
                >Edytuj</Link>
            <Button
                onClick={() =>customConfirm (()=>deleteCourse())}
                className="btn btn-danger"
                >Usuń</Button>
            </div>
            

        </div> : <Loading/>
    )
}   