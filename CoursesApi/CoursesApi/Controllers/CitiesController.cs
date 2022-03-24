using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/cities")]
    public class CitiesController: ControllerBase
    {
        private readonly ILogger<CitiesController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CitiesController(ILogger<CitiesController> logger, ApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CityDTO>>> Get()
        {
            var cities = await _context.Cities.ToListAsync();
            return Ok(cities);
        }
    }
}
