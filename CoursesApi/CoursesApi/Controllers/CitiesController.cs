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
      
        private readonly ApplicationDbContext _context;
 

        public CitiesController(ApplicationDbContext context)
        {
          
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<CityDTO>>> Get()
        {
            var cities = await _context.Cities.ToListAsync();
            return Ok(cities);
        }
    }
}
