using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/ratings")]
    public class RatingsController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public RatingsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRate = await _context.Ratings
                .FirstOrDefaultAsync(x=> x.CourseId == ratingDTO.CourseId && x.UserId == userId);

            if(currentRate == null)
            {
                var rating = new Rating();
                rating.CourseId = ratingDTO.CourseId;
                rating.Rate = ratingDTO.Rating;
                rating.UserId = userId;
                _context.Add(rating);
            } else
            {
                currentRate.Rate = ratingDTO.Rating;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("privateLessons")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> PostPrivateLesson([FromBody] RatingDTO ratingDTO)
        {

            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRate = await _context.PrivateLessonsRatings
                .FirstOrDefaultAsync(x => x.PrivateLessonId == ratingDTO.CourseId && x.UserId == userId);

            if (currentRate == null)
            {
                var rating = new PrivateLessonsRatings();
                rating.PrivateLessonId = ratingDTO.CourseId;
                rating.Rate = ratingDTO.Rating;
                rating.UserId = userId;
                _context.Add(rating);
            }
            else
            {
                currentRate.Rate = ratingDTO.Rating;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
