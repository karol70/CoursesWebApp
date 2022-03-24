using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [Route("api/courseCategories")]
    [ApiController]
    public class CourseCategoriesController : ControllerBase
    {
        private readonly ILogger<CourseCategoriesController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CourseCategoriesController(ILogger<CourseCategoriesController> logger, ApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> Get()
        {        
            var categories = await _context.CoursesCategories.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<CategoryDTO>>(categories);
        }



    }
}
