import { useEffect, useState } from "react";
import { categoriesDTO } from "./categories/categories.model";
import CategoriesList from "./categories/CategoriesList";

export default function  MainPage(){
    const [privateLessonCategories, setPrivateLessonCategories] = useState<categoriesDTO[]>([]);
    const [courseCategories, setCourseCategories] = useState<categoriesDTO[]>([]);
  
   useEffect(() => {
    const timerId = setTimeout(() => {
        setCourseCategories(
            [
                {
                    id: 1,
                    name: 'IT',
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Computer-science-education.jpg/1200px-Computer-science-education.jpg'
                  },
                  {
                    id: 2,
                    name: 'Fotografia i wideo',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlpGa2TlS6LoN7fv70J7H3lV_QTrqPXxQ5A&usqp=CAU'
                  }, 
                  {
                    id: 3,
                    name: 'Biznes',
                    img: 'https://businessexperttips.com/wp-content/uploads/2022/01/3.jpg'
                  }
            ]
        )
      setPrivateLessonCategories(
        [
          {
          id: 1,
          name: 'Matematyka',
          img: 'https://img.myloview.pl/fototapety/math-theory-mathematics-calculus-on-class-chalkboard-algebra-and-geometry-science-handwritten-formulas-vector-education-concept-formula-and-theory-on-blackboard-science-study-illustration-700-220355713.jpg'
        },
        {
          id: 2,
          name: 'Języki',
          img: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/647427-gettyimages-493796667-8cc398258cea687f6c803c6d88beb66d.jpg'
        }, 
        {
          id: 3,
          name: 'Chemia',
          img: 'https://mybrighthat.com/wp-content/uploads/2021/09/chemistry.jpg'
        }
      ]
      )
    }, 1);

    return () => clearTimeout(timerId);
  });

  return(
    <div className='container'>
    <h3>Kategorie Kursów i Szkoleń</h3>
    <CategoriesList categories={courseCategories}/>
    <h3>Kategorie Korepetycji</h3>
    <CategoriesList categories={privateLessonCategories}/>
  </div>
  )
}