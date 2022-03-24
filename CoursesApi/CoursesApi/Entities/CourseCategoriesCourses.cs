namespace CoursesApi.Entities
{
    public class CourseCategoriesCourses
    {
        public int CourseId { get; set; }
        public int CourseCategoryId { get; set; }
        public Course Course { get; set; }
        public CourseCategory CourseCategory { get; set; }  
    }
}
