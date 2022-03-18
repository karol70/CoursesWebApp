using CoursesApi.Entities;

namespace CoursesApi.Seeders
{
    public class CourseTypeSeeder
    {
        private readonly CoursesDbContext _dbContext;


        public CourseTypeSeeder(CoursesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.CourseTypes.Any())
                {
                    var courseTypes = GetCourseTypes();
                    _dbContext.CourseTypes.AddRange(courseTypes);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<CourseType> GetCourseTypes()
        {

            var courseTypes = new List<CourseType>()
            {
                new CourseType()
                {
                    Name = "Online"
                },
                new CourseType()
                {
                    Name = "Stacjonarnie"
                },
                new CourseType()
                {
                    Name = "Hybrydowo"
                },
                new CourseType()
                {
                    Name = "Inny"
                }
            };
            return courseTypes;

        }     
    }
}
