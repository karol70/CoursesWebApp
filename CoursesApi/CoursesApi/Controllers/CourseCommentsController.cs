using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/courseComments")]
    public class CourseCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMapper _mapper;

        public CourseCommentsController(ApplicationDbContext context, UserManager<IdentityUser> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<CourseCommentDTO>>> Get(int id)
        {
            var commentsQueryable = _context.CourseComments.AsQueryable();
            commentsQueryable = commentsQueryable.Where(c => c.CourseId == id).OrderByDescending(x=>x.Date);
            var comments = await commentsQueryable.ToListAsync();
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CourseCommentDTO courseCommentDTO)
        {
            var comment = _mapper.Map<CourseComments>(courseCommentDTO);
            
                _context.Add(comment);
                await _context.SaveChangesAsync();               
            
            return NoContent();
        }

    }
}
