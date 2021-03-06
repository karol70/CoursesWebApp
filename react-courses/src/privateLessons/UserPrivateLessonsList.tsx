import axios from "axios";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { courseDTO } from "../courses/courses.model";
import css from "../courses/CoursesList.module.css";
import { urlPrivateLessons } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import GenericList from "../utils/GenericList";
import SinglePrivateLesson from "./SinglePrivateLesson";

export default function UserPrivateLessonsList(props: userPrivateLessonsList) {
  const customAlert = useContext(AlertContext);
  const history = useHistory();

  async function deletePrivateCourse(id: number) {
    await axios.delete(`${urlPrivateLessons}/${id}`).then(() => {
      customAlert();
      history.push("/privateLessons");
    });
  }
  return (
    <GenericList list={props.privateLessons}>
      <div className={css.div}>
        {props.privateLessons?.map((privateLesson) => (
          <div className={css.usercourses} key={privateLesson.id}>
            <SinglePrivateLesson {...privateLesson} />
            <div className={css.userbuttons}>
              <Link
                style={{ marginRight: "1rem" }}
                className="btn btn-info"
                to={`/privateLesson/edit/${privateLesson.id}`}
              >
                Edytuj
              </Link>
              <Button
                onClick={() =>
                  customConfirm(() => deletePrivateCourse(privateLesson.id))
                }
                className="btn btn-danger"
              >
                Usuń
              </Button>
            </div>
          </div>
        ))}
      </div>
    </GenericList>
  );
}

interface userPrivateLessonsList {
  privateLessons?: courseDTO[];
}
