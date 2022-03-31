using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1,5)]
        public int Rate { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public string UserId   { get; set; }
        public IdentityUser User { get; set; } 
    }
}
