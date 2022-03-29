using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using CoursesApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/courses")]
    public class CoursesController : ControllerBase
    {
        private readonly ILogger<CoursesController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private string container = "courses";

        public CoursesController(ILogger<CoursesController> logger, ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CoursesDTO>>> Get()
        {
            var coursesQueryable = _context.Courses.AsQueryable();

            var courses = await coursesQueryable.ToListAsync();
            return Ok(courses);
        }

        [HttpGet("{id:int}")]
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

            var dto = _mapper.Map<CoursesDTO>(course);
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
            
            _context.Add(course);
            await _context.SaveChangesAsync();
            return course.Id;
        }

        [HttpGet("filter")]
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
            if(courseResult.Result is NotFoundResult) { return NotFound(); }

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
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);
            if (course == null)
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
