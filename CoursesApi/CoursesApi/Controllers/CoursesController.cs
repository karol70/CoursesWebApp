using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using CoursesApi.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/courses")]
    public class CoursesController:ControllerBase
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
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] CourseCreationDTO courseCreationDTO)
        {
            var course = _mapper.Map<Course>(courseCreationDTO);

            if(courseCreationDTO.Image != null)
            {
                course.Image = await _fileStorageService.SaveFile(container, courseCreationDTO.Image);
            } 
            if (!string.IsNullOrEmpty(courseCreationDTO.mainPage))
            {
                course.CourseHomePage = courseCreationDTO.mainPage;
            }
                        
                     
            _context.Add(course);
            await _context.SaveChangesAsync();
            return course.Id;
        }


    }
}
