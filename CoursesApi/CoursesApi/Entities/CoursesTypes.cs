namespace CoursesApi.Entities
{
    public class CoursesTypes
    {
        public int CourseId { get; set; }
        public int TypeId { get; set; }
        public Course Course   { get; set; }
        public Type Type { get; set; }  
    }
}
