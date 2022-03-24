using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class Course
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage ="Pole Tytuł Kursu jest wymagane")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Pole Opis jest wymagane")]
        public string Description { get; set; }
        public string? Price { get; set; }
        public string? Plan { get; set; }
        [Required(ErrorMessage = "Pole Email jest wymagane")]
        public string ContactEmail { get; set; }
        public string? ContactNumber { get; set; }
        public string? CourseHomePage { get; set; }
        public string? Image { get; set; }
        
        public CourseCategoriesCourses CourseCategoryCourse { get; set;}
        public CoursesCities CourseCity { get; set; }
        public CoursesTypes CourseType { get; set; }
 
    }
}
