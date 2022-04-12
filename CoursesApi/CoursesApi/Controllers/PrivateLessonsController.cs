using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using CoursesApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/privateLessons")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PrivateLessonsController:ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly UserManager<IdentityUser> _userManager;
        private string container = "privatelessons";

        public PrivateLessonsController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService,
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
            _userManager = userManager;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<CoursesDTO>>> Get()
        {

            var privateLessonsQueryable = _context.PrivateLessons.AsQueryable();
            var privateLessons = await privateLessonsQueryable.OrderByDescending(x=>x.Id).ToListAsync();
            if (privateLessons == null)
            {
                return NotFound();
            }
            return Ok(privateLessons);
        }

        [HttpGet("userPrivateLessons")]
        public async Task<ActionResult<List<PrivateLessonsDTO>>> GetUserPrivateLessons()
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var privateLessonsQueryable = _context.PrivateLessons.AsQueryable().Where(x => x.UserId == userId);
            var privateLessons = await privateLessonsQueryable.OrderByDescending(x => x.Id).ToListAsync();
            if (privateLessons == null)
            {
                return NotFound();
            }
            return Ok(privateLessons);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<PrivateLessonsDTO>> Get(int id)
        {
            var privateLessons = await _context.PrivateLessons
                .Include(x => x.PrivateLessonsCategoryPrivateLesson).ThenInclude(x => x.PrivateLessonsCategory)
                .Include(x => x.PrivateLessonsCiti).ThenInclude(x => x.City)
                .Include(x => x.PrivateLessonsType).ThenInclude(x => x.Type)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (privateLessons == null)
            {
                return NotFound();
            }

            var averageVote = 0.0;
            var userVote = 0;

            if (await _context.PrivateLessonsRatings.AnyAsync(x => x.PrivateLessonId == id))
            {
                averageVote = await _context.PrivateLessonsRatings.Where(x => x.PrivateLessonId == id)
                    .AverageAsync(x => x.Rate);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await _userManager.FindByEmailAsync(email);
                    var userId = user.Id;

                    var ratingDb = await _context.PrivateLessonsRatings.FirstOrDefaultAsync(x => x.PrivateLessonId == id && x.UserId == userId);

                    if (ratingDb != null)
                    {
                        userVote = ratingDb.Rate;
                    }
                }
            }

            var dto = _mapper.Map<PrivateLessonsDTO>(privateLessons);
            dto.AverageVote = averageVote;
            dto.UserVote = userVote;
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] CourseCreationDTO courseCreationDTO)
        {
            var privateLesson = _mapper.Map<PrivateLesson>(courseCreationDTO);

            if (courseCreationDTO.Image != null)
            {
                privateLesson.Image = await _fileStorageService.SaveFile(container, courseCreationDTO.Image);
            }
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;
            privateLesson.UserId = userId;

            _context.Add(privateLesson);
            await _context.SaveChangesAsync();
            return privateLesson.Id;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<PrivateLessonsDTO>>> Filter([FromQuery] FilterCoursesDTO filterCoursesDTO)
        {
            var privateLessonsQueryable = _context.PrivateLessons.AsQueryable();

            if (!string.IsNullOrEmpty(filterCoursesDTO.Title))
            {
                privateLessonsQueryable = privateLessonsQueryable.Where(x => x.Name.Contains(filterCoursesDTO.Title));
            }
            if (filterCoursesDTO.CategoryId != 0)
            {
                privateLessonsQueryable = privateLessonsQueryable
                    .Where(x => x.PrivateLessonsCategoryPrivateLesson.PrivateLessonsCategoryId == filterCoursesDTO.CategoryId);
            }
            if (filterCoursesDTO.TypeId != 0)
            {
                privateLessonsQueryable = privateLessonsQueryable.Where(x => x.PrivateLessonsType.TypeId == filterCoursesDTO.TypeId);
            }
            if (filterCoursesDTO.CityId != 0)
            {
                var citiesQueryable = _context.Cities.AsQueryable();
                var isAllPoland = citiesQueryable.Where(x => x.Id == filterCoursesDTO.CityId).Select(x => x.Name).Contains("Cała Polska");
                if (!isAllPoland)
                {
                    privateLessonsQueryable = privateLessonsQueryable.Where(x => x.PrivateLessonsCiti.CityId == filterCoursesDTO.CityId);
                }
            }
            var privateLessons = await privateLessonsQueryable.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<PrivateLessonsDTO>>(privateLessons);
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<PrivateLessonsDTO>> PutGet(int id)
        {
            var privateLessons = await Get(id);
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            if (privateLessons.Result is NotFoundResult || privateLessons.Value.UserId != userId) { return NotFound(); }



            var response = privateLessons.Value;
            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] CourseCreationDTO courseCreationDTO)
        {
            var privateLesson = await _context.PrivateLessons
                .Include(x => x.PrivateLessonsCategoryPrivateLesson)
                .Include(x => x.PrivateLessonsCiti)
                .Include(x => x.PrivateLessonsType)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (privateLesson == null)
            {
                return NotFound();
            }
            privateLesson = _mapper.Map(courseCreationDTO, privateLesson);

            if (courseCreationDTO.Image != null)
            {
                privateLesson.Image = await _fileStorageService.EditFile(container, courseCreationDTO.Image, privateLesson.Image);
            }
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var privateLessons = await Get(id);
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var privateLesson = await _context.PrivateLessons.FirstOrDefaultAsync(x => x.Id == id);
            if (privateLesson == null || privateLessons.Value.UserId != userId)
            {
                return NotFound();
            }
            _context.Remove(privateLesson);
            await _context.SaveChangesAsync();
            await _fileStorageService.DeleteFile(privateLesson.Image, container);
            return NoContent();
        }

    }
}

