using CoursesApi.Entities;

namespace CoursesApi.Seeders
{
    public class CourseTypeSeeder
    {
        private readonly ApplicationDbContext _dbContext;


        public CourseTypeSeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Types.Any())
                {
                    var courseTypes = GetCourseTypes();
                    _dbContext.Types.AddRange(courseTypes);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<Entities.Type> GetCourseTypes()
        {

            var courseTypes = new List<Entities.Type>()
            {
                new Entities.Type()
                {
                    Name = "Online"
                },
                new Entities.Type()
                {
                    Name = "Stacjonarnie"
                },
                new Entities.Type()
                {
                    Name = "Hybrydowo"
                },
                new Entities.Type()
                {
                    Name = "Inny"
                }
            };
            return courseTypes;

        }     
    }
}
