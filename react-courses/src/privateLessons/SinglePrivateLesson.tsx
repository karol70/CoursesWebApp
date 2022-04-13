import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseDTO } from "../courses/courses.model";
import { urlPrivateLessons } from "../endpoints";
import css from "../courses/Courses.module.css";
import privateLessonLogo from "../images/privateLessons.png";

export default function SinglePrivateLesson(props: courseDTO) {
  const buildLink = () => `/privateLesson/${props.id}`;
  const [course, setCourse] = useState<courseDTO>();
  const [cityName, setCityName] = useState<string>();
  const [typeName, setTypeName] = useState<String>();

  useEffect(() => {
    axios
      .get(`${urlPrivateLessons}/${props.id}`)
      .then((response: AxiosResponse<courseDTO>) => {
        setCourse(response.data);
        setCityName(response.data.city.name);
        setTypeName(response.data.type.name);
      });
  }, [props.id]);

  function viewRatingStars() {
    return (
      <div>
        {[0, 1, 2, 3, 4].map((_, index) => (
          <FontAwesomeIcon
            icon="star"
            key={index}
            className={`fa-lg pointer checked`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        {props.image ? (
          <img alt="img" src={props.image} />
        ) : (
          <img alt="img" src={privateLessonLogo} />
        )}
        <h4>{props.name}</h4>
      </Link>
      <div>{cityName}</div>
      {typeName}
      {viewRatingStars()}{" "}
      {course?.averageVote === 0 ? (
        <p>Brak ocen</p>
      ) : (
        <p>Średnia ocen: {course?.averageVote}</p>
      )}
    </div>
  );
}
