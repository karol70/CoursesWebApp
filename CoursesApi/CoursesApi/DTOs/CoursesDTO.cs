namespace CoursesApi.Entities
{
    public class CoursesDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Plan { get; set; }
        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }
        public string CourseHomePage { get; set; }
        public string Image { get; set; }
    
        public  CourseCategory Category { get; set; }
       
        public  City City { get; set; }
       
        public  Type Type { get; set; }

        public double AverageVote { get; set; }
        public int UserVote { get; set; }

        public string UserId { get; set; }
    }
}
