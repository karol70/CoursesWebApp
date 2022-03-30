using System.ComponentModel.DataAnnotations;

namespace CoursesApi.DTOs
{
    public class UserCredentials
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string? UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
