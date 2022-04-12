namespace CoursesApi.Entities
{
    public class PrivateLessonsTypes
    {
        public int PrivateLessonId { get; set; }
        public int TypeId { get; set; }
        public PrivateLesson PrivateLesson { get; set; }
        public Type Type { get; set; }
    }
}
