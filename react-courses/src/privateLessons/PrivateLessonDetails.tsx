import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthenticationContext from "../auth/AuthenticationContext";
import { commentDTO } from "../comments/comment.model";
import CommentsList from "../comments/CommentsList";
import { courseDTO } from "../courses/courses.model";
import {
  urlPrivateLessons,
  urlPrivateLessonsComments,
  urlRatings,
} from "../endpoints";
import Loading from "../utils/Loading";
import Ratings from "../utils/Ratings";
import css from "../courses/CoursesDetails.module.css";
import * as Yup from "yup";
import CommentField from "../forms/CommentField";
import Button from "../utils/Button";
import DisplayErrors from "../utils/DisplayErrors";
import privateLessonLogo from "../images/privateLessons.png";

export default function PrivateLessonDetails() {
  const { id }: any = useParams();
  const [privateLesson, setPrivateLesson] = useState<courseDTO>();
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  const { claims } = useContext(AuthenticationContext);
  const [comments, setComments] = useState<commentDTO[]>([]);

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  async function createComment(content: string) {
    try {
      await axios
        .post(urlPrivateLessonsComments, {
          courseId: id,
          date: new Date(),
          content: content,
          userName: getUserName(),
        })
        .then(() => {
          Swal.fire({ icon: "success", title: "Komentarz został dodany" }).then(
            function () {
              window.location.reload();
            }
          );
          history.push(`/privateLessons/${id}`);
        });
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${urlPrivateLessons}/${id}`)
      .then((response: AxiosResponse<courseDTO>) => {
        setPrivateLesson(response.data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${urlPrivateLessonsComments}/${id}`)
      .then((response: AxiosResponse<commentDTO[]>) => {
        setComments(response.data);
      });
  }, [id]);

  async function handleRate(rate: number) {
    await axios
      .post(`${urlRatings}/privateLessons`, { rating: rate, courseId: id })
      .then(() => {
        Swal.fire({ icon: "success", title: "Dodano ocenę" }).then(function () {
          window.location.reload();
        });
      });
  }

  return (
    <>
      {privateLesson ? (
        <div className="container mt-4" style={{ display: "flex" }}>
          <div className={css.left}>
            <h3>{privateLesson.name}</h3>
            {privateLesson.image ? (
              <img alt="img" src={privateLesson.image} />
            ) : (
              <img alt="img" src={privateLessonLogo} />
            )}
            <div>
              {" "}
              Dodaj ocenę:
              <Ratings
                maximumValue={5}
                selectedValue={privateLesson.userVote}
                onChange={handleRate}
              />
              ({privateLesson.averageVote})
            </div>
          </div>

          <div className={css.right}>
            <h4>Opis:</h4>
            <p>{privateLesson.description}</p>

            {privateLesson.plan ? (
              <div>
                <h4>Harmonogram:</h4>
                <p>{privateLesson.plan}</p>
              </div>
            ) : null}

            <h4>Miasto:</h4>
            <p>{privateLesson.type.name}</p>

            <h4>Tryb i forma szkolenia:</h4>
            <p>{privateLesson.city.name}</p>

            {privateLesson.price ? (
              <div>
                <h4>Cena:</h4>
                <p>{privateLesson.price} PLN</p>
              </div>
            ) : null}

            <h4>Email:</h4>
            <p>{privateLesson.contactEmail}</p>

            {privateLesson.contactNumber ? (
              <div>
                <h4>Telefon:</h4>
                <p>{privateLesson.contactNumber}</p>
              </div>
            ) : null}

            {privateLesson.courseHomePage ? (
              <div>
                <h4>Więcej na naszej stronie:</h4>
                <a href={privateLesson.courseHomePage} target="_blank">
                  {privateLesson.courseHomePage}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {privateLesson ? (
        <div className="container mt-4" style={{ display: "flex" }}>
          {comments ? (
            <div className={css.leftcomment}>
              <CommentsList comments={comments} />
            </div>
          ) : (
            <p>Brak komentarzy</p>
          )}

          <div className={css.right}>
            <Formik
              initialValues={{ courseId: "", content: "", date: "" }}
              onSubmit={(formikProps) => createComment(formikProps.content)}
              validationSchema={Yup.object({
                content: Yup.string().required(
                  "To pole jest wymagane, jeżeli chcesz dodać komentarz"
                ),
              })}
            >
              {(formikProps) => (
                <Form>
                  <CommentField />
                  <Button disabled={formikProps.isSubmitting} type="submit">
                    Opublikuj
                  </Button>
                </Form>
              )}
            </Formik>
            <DisplayErrors errors={errors} />
          </div>
        </div>
      ) : null}
    </>
  );
}
