import { courseDTO } from "../courses/courses.model";
import SingleCourse from "../courses/SingleCourse";
import GenericList from "../utils/GenericList";
import css from '../courses/CoursesList.module.css';

export default function PrivateLessonsList(props: privateLessonsListProps){
    return(
        <GenericList
            list={props.privateLessons}>
            <div className={css.div}>          
                {props.privateLessons?.map(  privateLesson => 
                    <SingleCourse {... privateLesson} key={privateLesson.id}/>)}
            </div>       
        </GenericList>
        )
    }
    
    interface privateLessonsListProps{
        privateLessons?: courseDTO[];
    }