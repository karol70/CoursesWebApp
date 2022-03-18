using CoursesApi.Entities;
using CoursesApi.Helpers;
using System.Drawing;

namespace CoursesApi.Seeders
{
    public class CategorySeeder
    {
        private readonly CoursesDbContext _dbContext;


        public CategorySeeder(CoursesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Categories.Any())
                {
                    var categories = GetCategories();
                    _dbContext.Categories.AddRange(categories);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<Category> GetCategories()
        {

            var categories = new List<Category>()
            {

                new Category()
                {
                    Name = "IT",
                    CategoryImage = "https://cdn-icons-png.flaticon.com/512/1055/1055683.png"
                },
                new Category()
                {
                    Name = "Fotografia i wideo",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2983/2983067.png"
                },
                new Category()
                {
                    Name = "Finanse i Rachunkowość",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/438/438506.png"
                },
                new Category()
                {
                    Name = "Języki obce",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3898/3898150.png"
                },
                new Category()
                {
                    Name = "Biznes",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3135/3135691.png"
                },
                new Category()
                {
                    Name = "Technika",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2593/2593294.png"
                },
                new Category()
                {
                    Name = "Rozwój osobisty",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/1535/1535019.png"
                },
                new Category()
                {
                    Name = "Obsługa klienta",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2706/2706950.png"
                },
                new Category()
                {
                    Name = "Zdrowie i uroda",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/2786/2786289.png"
                },
                new Category()
                {
                    Name = "Motoryzacja",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/7071/7071468.png"
                },
                new Category()
                {
                    Name = "Gastronomia",
                    CategoryImage ="https://cdn-icons-png.flaticon.com/512/3626/3626698.png"
                },

            };
            return categories;
        }
    }
}
