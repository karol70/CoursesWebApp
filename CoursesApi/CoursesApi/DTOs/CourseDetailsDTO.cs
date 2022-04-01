namespace CoursesApi.DTOs
{
    public class CourseDetailsDTO
    {
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public string TypeName { get; set; }
        public string CityName { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }
        public int CityId { get; set; }
        public string Description { get; set; }
        public string Plan { get; set; }
        public string Image { get; set; }
        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }
        public string Price { get; set; }
        public string CourseHomePage { get; set; }
    }
}
