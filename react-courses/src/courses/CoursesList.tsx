import GenericList from "../utils/GenericList";
import { courseDTO } from "./courses.model"
import SingleCourse from "./SingleCourse";
import css from './CoursesList.module.css';

export default function CoursesList(props: coursesListProps){
    return(
    <GenericList
        list={props.courses}>
        <div className={css.div}>          
            {props.courses?.map(  course => 
                <SingleCourse {... course} key={course.id}/>)}
        </div>       
    </GenericList>
    )
}

interface coursesListProps{
    courses?: courseDTO[];
}