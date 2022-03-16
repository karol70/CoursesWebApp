import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import { courseDTO } from "./courses.model";
import css from './CoursesDetails.module.css';

export default function CourseDetails(){

    const{id}: any = useParams();
    const [course, setCourse] = useState<courseDTO>();

    useEffect(() => {
        const timerId = setTimeout(() => {
            setCourse(                
                    {
                        id: 1,
                        title: 'C++ poziom zaawansowany',
                        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/213px-ISO_C%2B%2B_Logo.svg.png",
                        category: {
                            id: 2,
                            name: 'IT',
                            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlpGa2TlS6LoN7fv70J7H3lV_QTrqPXxQ5A&usqp=CAU',
            
                        },
                        type: "online",
                        city: "Lublin",
                        description: "Jest to szkolenie z C++ dla zaawansowanych. Omawiamy zagadnienia z OOP - programowania obiektowego oraz czystego kodu",
                        plan: `1. Początek
                        2.Środek
                        3.Koniec`,
                        contact: "karolwg19@gmail.com",
                        mainPage: "karolwegrzyn.pl"       
                      }
            )
            },1);   
        return () => clearTimeout(timerId);
      });

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