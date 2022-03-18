using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class Course
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
        
        public int CategoryId { get; set;}
        public virtual Category Category { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public int CourseTypeId { get; set; }
        public virtual CourseType CourseType { get; set; }

    }
}
