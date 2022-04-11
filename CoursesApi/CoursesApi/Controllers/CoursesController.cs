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
    [Route("api/courses")]
    [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
    public class CoursesController : ControllerBase
    {
        private readonly ILogger<CoursesController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly UserManager<IdentityUser> _userManager;
        private string container = "courses";

        public CoursesController(ILogger<CoursesController> logger, 
            ApplicationDbContext context, IMapper mapper, 
            IFileStorageService fileStorageService,
            UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<CoursesDTO>>> Get()
        {
            
            var coursesQueryable = _context.Courses.AsQueryable();
            var courses = await coursesQueryable.ToListAsync();
            if(courses == null)
            {
                return NotFound();
            }
            return Ok(courses);
        }

        [HttpGet("userCourses")]
        public async Task<ActionResult<List<CoursesDTO>>> GetUserCourses()
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var coursesQueryable = _context.Courses.AsQueryable().Where(x => x.UserId == userId);
            var courses = await coursesQueryable.ToListAsync();
            if (courses == null)
            {
                return NotFound();
            }
            return Ok(courses);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<CoursesDTO>> Get(int id)
        {
            var course = await _context.Courses
                .Include(x => x.CourseCategoryCourse).ThenInclude(x => x.CourseCategory)
                .Include(x => x.CourseCity).ThenInclude(x => x.City)
                .Include(x=>x.CourseType).ThenInclude(x=>x.Type)
                .FirstOrDefaultAsync(x=>x.Id ==id);
            if(course == null)
            {
                return NotFound();
            }

            var averageVote = 0.0;
            var userVote = 0;

            if(await _context.Ratings.AnyAsync(x => x.CourseId == id))
            {
                averageVote = await _context.Ratings.Where(x => x.CourseId == id)
                    .AverageAsync(x => x.Rate);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await _userManager.FindByEmailAsync(email);
                    var userId = user.Id;

                    var ratingDb = await _context.Ratings.FirstOrDefaultAsync(x => x.CourseId == id && x.UserId == userId);

                    if(ratingDb != null)
                    {
                        userVote = ratingDb.Rate;
                    }
                }
            }

            var dto = _mapper.Map<CoursesDTO>(course);
            dto.AverageVote = averageVote;
            dto.UserVote = userVote;
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] CourseCreationDTO courseCreationDTO)
        {
            var course = _mapper.Map<Course>(courseCreationDTO);

            if(courseCreationDTO.Image != null)
            {
                course.Image = await _fileStorageService.SaveFile(container, courseCreationDTO.Image);
            }
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;
            course.UserId = userId;

            _context.Add(course);
            await _context.SaveChangesAsync();
            return course.Id;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<CoursesDTO>>> Filter([FromQuery] FilterCoursesDTO filterCoursesDTO)
        {
            var coursesQueryable = _context.Courses.AsQueryable();
            
            if (!string.IsNullOrEmpty(filterCoursesDTO.Title))
            {
                coursesQueryable = coursesQueryable.Where(x => x.Name.Contains(filterCoursesDTO.Title));
            }
            if(filterCoursesDTO.CategoryId != 0)
            {
                coursesQueryable = coursesQueryable
                    .Where(x => x.CourseCategoryCourse.CourseCategoryId == filterCoursesDTO.CategoryId);
            }
            if (filterCoursesDTO.TypeId != 0)
            {
                coursesQueryable = coursesQueryable.Where(x => x.CourseType.TypeId == filterCoursesDTO.TypeId);
            }
            if(filterCoursesDTO.CityId != 0)
            {
                var citiesQueryable = _context.Cities.AsQueryable();
                var isAllPoland = citiesQueryable.Where(x=> x.Id == filterCoursesDTO.CityId).Select(x => x.Name).Contains("Cała Polska");
                if(!isAllPoland)
                {
                    coursesQueryable = coursesQueryable.Where(x => x.CourseCity.CityId == filterCoursesDTO.CityId);
                }                  
            }
            var courses = await coursesQueryable.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<CoursesDTO>>(courses);
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<CoursesDTO>> PutGet(int id)
        {
            var courseResult = await Get(id);
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            if (courseResult.Result is NotFoundResult || courseResult.Value.UserId != userId) { return NotFound(); }

           
 
            var response = courseResult.Value;
            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromForm] CourseCreationDTO courseCreationDTO)
        {
            var course = await _context.Courses
                .Include(x => x.CourseCategoryCourse)
                .Include(x=>x.CourseCity)
                .Include(x=>x.CourseType)
                .FirstOrDefaultAsync(x => x.Id == id);
            if(course == null)
            {
                return NotFound();
            }
            course = _mapper.Map(courseCreationDTO, course);

            if(courseCreationDTO.Image != null)
            {
                course.Image = await _fileStorageService.EditFile(container, courseCreationDTO.Image, course.Image);
            }
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var courseResult = await Get(id);
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);
            if (course == null || courseResult.Value.UserId != userId)
            {
                return NotFound();
            }
            _context.Remove(course);
            await _context.SaveChangesAsync();
            await _fileStorageService.DeleteFile(course.Image, container);
            return NoContent();
        }

        



    }
}
