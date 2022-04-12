using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class PrivateLessonsRatings
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Rate { get; set; }
        public int PrivateLessonId { get; set; }
        public PrivateLesson PrivateLesson { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}
