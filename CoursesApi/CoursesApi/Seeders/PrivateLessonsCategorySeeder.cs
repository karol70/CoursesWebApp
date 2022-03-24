using CoursesApi.Entities;

namespace CoursesApi.Seeders
{
    public class PrivateLessonsCategorySeeder
    {
        private readonly ApplicationDbContext _dbContext;


        public PrivateLessonsCategorySeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.PrivateLessonsCategories.Any())
                {
                    var categories = GetCategories();
                    _dbContext.PrivateLessonsCategories.AddRange(categories);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<PrivateLessonsCategory> GetCategories()
        {

            var categories = new List<PrivateLessonsCategory>()
            {

                new PrivateLessonsCategory()
                {
                    Name = "Matematyka",
                    CategoryImage = "https://cdn-icons-png.flaticon.com/512/3696/3696447.png"
                },
                new PrivateLessonsCategory()
                {
                    Name = "Fizyka",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2933/2933801.png"
                },
                new PrivateLessonsCategory()
                {
                    Name = "Chemia",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/1283/1283419.png"
                },
                new PrivateLessonsCategory()
                {
                    Name = "Języki obce",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3898/3898150.png"
                }
               
              
            };
            return categories;
        }
    
    }
}
