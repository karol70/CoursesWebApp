import { courseDTO } from "../courses/courses.model";
import css from "../courses/CoursesList.module.css";
import GenericList from "../utils/GenericList";
import SinglePrivateLesson from "./SinglePrivateLesson";

export default function PrivateLessonsList(props: privateLessonsListProps) {
  return (
    <GenericList list={props.privateLessons}>
      <div className={css.div}>
        {props.privateLessons?.map((privateLesson) => (
          <SinglePrivateLesson {...privateLesson} key={privateLesson.id} />
        ))}
      </div>
    </GenericList>
  );
}

interface privateLessonsListProps {
  privateLessons?: courseDTO[];
}
