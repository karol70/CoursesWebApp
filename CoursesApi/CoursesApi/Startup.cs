using AutoMapper;
using CoursesApi.APIBehaviour;
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
              services.AddDbContext<ApplicationDbContext>(options =>
              options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
              mySqlOptionsAction => mySqlOptionsAction.UseNetTopologySuite()));


            services.AddSingleton(provider => new MapperConfiguration(config =>
            {             
                config.AddProfile(new AutoMapperProfile());
            }).CreateMapper());

            

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(MyExceptionFilter));
                options.Filters.Add(typeof(ParseBadRequest));
            }).ConfigureApiBehaviorOptions(BadRequestBehavior.Parse);

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            
            services.AddScoped<CourseCategorySeeder>();
            services.AddScoped<CitySeeder>();
            services.AddScoped<CourseTypeSeeder>();
            services.AddScoped<PrivateLessonsCategorySeeder>();

            services.AddScoped<IFileStorageService, InAppStorageService>();
            services.AddHttpContextAccessor();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            services.AddCors(options =>
            {
                var fronendURL = Configuration.GetValue<string>("frontend_url");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(fronendURL).AllowAnyMethod().AllowAnyHeader();
                   // .WithExposedHeaders(new string[] { "totalAmountOfRecords" });

                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, CourseCategorySeeder courseCategorySeeder, CitySeeder citySeeder,
            CourseTypeSeeder courseTypeSeeder, PrivateLessonsCategorySeeder privateLessonsCategorySeeder)
        {
            courseCategorySeeder.Seed();
            citySeeder.Seed();
            courseTypeSeeder.Seed();
            privateLessonsCategorySeeder.Seed();

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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
