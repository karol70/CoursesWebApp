namespace CoursesApi.Entities
{
    public class CoursesCities
    {
        public int CourseId { get; set; }
        public int CityId { get; set; }
        public Course Course { get; set; }
        public City City { get; set; }
    }
}
