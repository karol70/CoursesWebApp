namespace CoursesApi.Entities
{
    public class CourseComments
    {
        public int Id { get; set; }
        public int CourseId { get; set;}
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
    }
}
