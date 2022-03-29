namespace CoursesApi.DTOs
{
    public class FilterCoursesDTO
    {
        public string? Title { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }
        public int CityId { get; set; }
    }
}
