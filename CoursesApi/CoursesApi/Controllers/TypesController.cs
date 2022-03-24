using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/types")]
    public class TypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TypesController> _logger;
        private readonly IMapper _mapper;

        public TypesController(ApplicationDbContext context, ILogger<TypesController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<TypeDTO>>> Get()
        {
            var types = await _context.Types.ToListAsync();
            return Ok(types);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] TypeCreationDTO typeCreationDTO)
        {
            var types = _mapper.Map<Entities.Type>(typeCreationDTO);
            _context.Add(types);
            await _context.SaveChangesAsync();
            return types.Id;
        }
    }
}
