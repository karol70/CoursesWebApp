import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { categoriesDTO } from "../categories/categories.model";
import { urlCourseCategories, urlCourses } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertCourseToFormData } from "../utils/formDataUtils";
import CourseForm from "./CourseForm";
import { courseCreationDTO } from "./courses.model";

export default function CourseCreation() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  const [categories, setCategories] = useState<categoriesDTO[]>([]);

  useEffect(() => {
    axios
      .get(urlCourseCategories)
      .then((response: AxiosResponse<categoriesDTO[]>) => {
        setCategories(response.data);
      });
  }, []);

  async function create(course: courseCreationDTO) {
    try {
      const formData = convertCourseToFormData(course);
      const response = await axios({
        method: "post",
        url: urlCourses,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({ icon: "success", title: "Kurs został dodany" });
      history.push(`/courses`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <div className="container mt-3">
      <DisplayErrors errors={errors} />
      <CourseForm
        title="Utwórz kurs"
        categories={categories}
        onSubmit={async (values) => await create(values)}
        model={{
          cityId: 0,
          typeId: 0,
          categoryId: 0,
          title: "",
          description: "",
          plan: "",
          contactEmail: "",
          contactTelephoneNumber: "",
          courseHomePage: "",
          price: "",
        }}
      />
    </div>
  );
}
