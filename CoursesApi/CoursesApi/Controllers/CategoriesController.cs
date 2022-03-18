using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly ILogger<CategoriesController> _logger;
        private readonly CoursesDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(ILogger<CategoriesController> logger, CoursesDbContext context, IMapper mapper)
        {

            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> Get()
        {        
            var categories = await _context.Categories.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<CategoryDTO>>(categories);
        }



    }
}
