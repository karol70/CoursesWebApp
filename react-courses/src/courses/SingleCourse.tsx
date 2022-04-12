import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlCourses } from "../endpoints";
import courseLogo from "../images/courses.png";
import { courseDTO } from "./courses.model";
import css from "./Courses.module.css";

export default function SingleCourse(props: courseDTO) {
  const buildLink = () => `/course/${props.id}`;
  const [course, setCourse] = useState<courseDTO>();
  const [cityName, setCityName] = useState<string>();
  const [typeName, setTypeName] = useState<String>();

  useEffect(() => {
    axios
      .get(`${urlCourses}/${props.id}`)
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
          <img alt="img" src={require(props.image).default} />
        ) : (
          <img alt="img" src={courseLogo} />
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
