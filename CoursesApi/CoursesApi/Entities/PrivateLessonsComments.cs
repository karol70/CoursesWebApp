namespace CoursesApi.Entities
{
    public class PrivateLessonsComments
    {
        public int Id { get; set; }
        public int PrivateLessonId { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
    }
}
