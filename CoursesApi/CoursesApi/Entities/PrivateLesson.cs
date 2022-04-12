using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class PrivateLesson
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole Tytuł Kursu jest wymagane")]
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

        public PrivateLessonsCategoryPrivateLesson PrivateLessonsCategoryPrivateLesson { get; set; }
        public PrivateLessonsCities PrivateLessonsCiti { get; set; }
        public PrivateLessonsTypes PrivateLessonsType { get; set; }

        public string UserId { get; set; }
    }
}
