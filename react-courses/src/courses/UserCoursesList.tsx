import GenericList from "../utils/GenericList";
import { courseDTO } from "./courses.model";
import SingleCourse from "./SingleCourse";
import css from './CoursesList.module.css';
import { Link, useHistory } from "react-router-dom";
import Button from "../utils/Button";
import axios from "axios";
import { urlCourses } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import customConfirm from "../utils/customConfirm";

export default function UserCoursesList(props: userCoursesListProps){

    const customAlert = useContext(AlertContext);
    const history = useHistory();

    async function deleteCourse(id: number){
        await axios.delete(`${urlCourses}/${id}`)
          .then(()=> {
              customAlert()
              history.push('/courses')
          });
  }
    return(
        <GenericList
        list={props.courses}>
        
        <div className={css.div}>       
            {props.courses?.map(  course => 
            <div className={css.usercourses} key={course.id}>
            
                <SingleCourse {... course}/>
                <div className={css.userbuttons}>
                <Link style={{marginRight: '1rem'}} className="btn btn-info"
                        to={`/course/edit/${course.id}`}
                    >Edytuj</Link>
                <Button
                    onClick={() =>customConfirm (()=>deleteCourse(course.id))}
                    className="btn btn-danger"
                    >Usuń</Button>
                </div>
            </div>  
           )}
        </div>
               
    </GenericList>
    )
}

interface userCoursesListProps{
    courses?: courseDTO[];
}