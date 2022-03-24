using CoursesApi.Entities;
using CoursesApi.Helpers;
using System.Drawing;

namespace CoursesApi.Seeders
{
    public class CourseCategorySeeder
    {
        private readonly ApplicationDbContext _dbContext;


        public CourseCategorySeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.CoursesCategories.Any())
                {
                    var categories = GetCategories();
                    _dbContext.CoursesCategories.AddRange(categories);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<CourseCategory> GetCategories()
        {

            var categories = new List<CourseCategory>()
            {

                new CourseCategory()
                {
                    Name = "IT",
                    CategoryImage = "https://cdn-icons-png.flaticon.com/512/1055/1055683.png"
                },
                new CourseCategory()
                {
                    Name = "Fotografia i wideo",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2983/2983067.png"
                },
                new CourseCategory()
                {
                    Name = "Finanse i Rachunkowość",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/438/438506.png"
                },
                new CourseCategory()
                {
                    Name = "Języki obce",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3898/3898150.png"
                },
                new CourseCategory()
                {
                    Name = "Biznes",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3135/3135691.png"
                },
                new CourseCategory()
                {
                    Name = "Technika",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2593/2593294.png"
                },
                new CourseCategory()
                {
                    Name = "Rozwój osobisty",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/1535/1535019.png"
                },
                new CourseCategory()
                {
                    Name = "Obsługa klienta",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2706/2706950.png"
                },
                new CourseCategory()
                {
                    Name = "Zdrowie i uroda",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2786/2786289.png"
                },
                new CourseCategory()
                {
                    Name = "Motoryzacja",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/7071/7071468.png"
                },
                new CourseCategory()
                {
                    Name = "Gastronomia",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3626/3626698.png"
                },

            };
            return categories;
        }
    }
}
