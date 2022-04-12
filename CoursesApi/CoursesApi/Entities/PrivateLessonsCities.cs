namespace CoursesApi.Entities
{
    public class PrivateLessonsCities
    {
        public int PrivateLessonId { get; set; }
        public int CityId { get; set; }
        public PrivateLesson PrivateLesson { get; set; }
        public City City { get; set; }
    }
}
