using CoursesApi.Entities;

namespace CoursesApi.Seeders
{
    public class CitySeeder
    {
        private readonly ApplicationDbContext _dbContext;


        public CitySeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Cities.Any())
                {
                    var cities = GetCities();
                    _dbContext.Cities.AddRange(cities);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<City> GetCities()
        {

            var cities = new List<City>()
            {
                new City()
                {
                    Name ="Cała Polska"
                },
                new City()
                {
                    Name = "Warszawa"
                },
                new City()
                {
                    Name = "Kraków"
                },
                new City()
                {
                    Name = "Łódź"
                },
                new City()
                {
                    Name = "Wrocław"
                },
                new City()
                {
                    Name = "Poznań"
                },
                new City()
                {
                    Name = "Gdańsk"
                },
                new City()
                {
                    Name = "Szczecin"
                },
                new City()
                {
                    Name = "Bydgoszcz"
                },
                new City()
                {
                    Name = "Lublin"
                },
                new City()
                {
                    Name = "Białystok"
                },
                new City()
                {
                    Name = "Katowice"
                },
                new City()
                {
                    Name = "Gdynia"
                },
                new City()
                {
                    Name = "Częstochowa"
                },
                new City()
                {
                    Name = "Radom"
                },
                new City()
                {
                    Name = "Toruń"
                },
                new City()
                {
                    Name = "Sosnowiec"
                },
                new City()
                {
                    Name = "Kielce"
                },
                new City()
                {
                    Name = "Rzeszów"
                },
                new City()
                {
                    Name = "Gliwice"
                },
                new City()
                {
                    Name = "Olsztyn"
                },
                new City()
                {
                    Name = "Zabrze"
                },
                new City()
                {
                    Name = "Bielsko-Biała"
                },
                new City()
                {
                    Name = "Bytom"
                },
                new City()
                {
                    Name = "Zielona Góra"
                },
                new City()
                {
                    Name = "Rybnik"
                },
                new City()
                {
                    Name = "Ruda Śląska"
                },
                new City()
                {
                    Name = "Opole"
                },
                new City()
                {
                    Name = "Tychy"
                },
                new City()
                {
                    Name = "Gorzów Wielkoposlki"
                },
                new City()
                {
                    Name = "Elbląg"
                },
                new City()
                {
                    Name = "Dąbrowa Górnicza"
                },
                new City()
                {
                    Name = "Płock"
                },
                new City()
                {
                    Name = "Wałbrzych"
                },
                new City()
                {
                    Name = "Włocławek"
                },
                new City()
                {
                    Name = "Tarnów"
                },
                new City()
                {
                    Name = "Chorzów"
                },
                new City()
                {
                    Name = "Koszalin"
                }

            };
            return cities;
        }
    }
}
