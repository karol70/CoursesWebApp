namespace CoursesApi.DTOs
{
    public class CourseCommentDTO
    {
        public int CourseId { get; set; }
        public string? UserName { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
  }
}
