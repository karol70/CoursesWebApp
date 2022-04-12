namespace CoursesApi.Entities
{
    public class PrivateLessonsCategoryPrivateLesson
    {
        public int PrivateLessonId { get; set; }
        public int PrivateLessonsCategoryId { get; set; }
        public PrivateLesson PrivateLesson { get; set; }
        public PrivateLessonsCategory PrivateLessonsCategory { get; set; }
    }
}
