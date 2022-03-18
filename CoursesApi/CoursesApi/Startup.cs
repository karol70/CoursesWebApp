using AutoMapper;
using CoursesApi.Entities;
using CoursesApi.Filters;
using CoursesApi.Helpers;
using CoursesApi.Seeders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

namespace CoursesApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

              var connectionString = Configuration.GetConnectionString("WebApiDatabase");
              services.AddDbContext<CoursesDbContext>(options =>
              options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
              mySqlOptionsAction => mySqlOptionsAction.UseNetTopologySuite()));


            services.AddSingleton(provider => new MapperConfiguration(config =>
            {             
                config.AddProfile(new AutoMapperProfile());
            }).CreateMapper());

            // services.AddDbContext<CoursesDbContext>();

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(MyExceptionFilter));
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            
            services.AddScoped<CategorySeeder>();
            services.AddScoped<CitySeeder>();
            services.AddScoped<CourseTypeSeeder>();

            services.AddScoped<IFileStorageService, InAppStorageService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            services.AddCors(options =>
            {
                var fronendURL = Configuration.GetValue<string>("frontend_url");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(fronendURL).AllowAnyMethod().AllowAnyHeader();
                  //  .WithExposedHeaders(new string[] { "totalAmountOfRecords" });

                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, CategorySeeder categorySeeder, CitySeeder citySeeder,
            CourseTypeSeeder courseTypeSeeder)
        {
            categorySeeder.Seed();
            citySeeder.Seed();
            courseTypeSeeder.Seed();

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
