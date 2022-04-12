using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Diagnostics.CodeAnalysis;

namespace CoursesApi.Entities
{
    public class ApplicationDbContext: IdentityDbContext
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(25);

            modelBuilder.Entity<Course>()
                .Property(c => c.Description)
                .IsRequired();

            modelBuilder.Entity<Course>()
                .Property(c => c.ContactEmail)
                .IsRequired();


            modelBuilder.Entity<PrivateLesson>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(25);

            modelBuilder.Entity<PrivateLesson>()
                .Property(c => c.Description)
                .IsRequired();

            modelBuilder.Entity<PrivateLesson>()
                .Property(c => c.ContactEmail)
                .IsRequired();


            modelBuilder.Entity<CourseCategoriesCourses>()
                .HasKey(x => new { x.CourseCategoryId, x.CourseId });

            modelBuilder.Entity<CoursesCities>()
                .HasKey(x => new { x.CityId, x.CourseId });

            modelBuilder.Entity<CoursesTypes>()
                .HasKey(x => new { x.TypeId, x.CourseId });


            modelBuilder.Entity<PrivateLessonsCategoryPrivateLesson>()
               .HasKey(x => new { x.PrivateLessonsCategoryId, x.PrivateLessonId });

            modelBuilder.Entity<PrivateLessonsCities>()
                .HasKey(x => new { x.CityId, x.PrivateLessonId });

            modelBuilder.Entity<PrivateLessonsTypes>()
                .HasKey(x => new { x.TypeId, x.PrivateLessonId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<CourseCategoriesCourses> CourseCategoriesCourses { get; set; }
        public DbSet<CoursesCities> CoursesCities { get; set;}
        public DbSet<CoursesTypes> CoursesTypes { get; set;}
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseCategory> CoursesCategories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<CourseComments> CourseComments { get; set; }



        public DbSet<PrivateLesson> PrivateLessons { get; set; }
        public DbSet<PrivateLessonsCategory> PrivateLessonsCategories { get; set; }  
        public DbSet<PrivateLessonsCategoryPrivateLesson> PrivateLessonsCategoriesPrivateLessons { get; set; }
        public DbSet<PrivateLessonsCities> PrivateLessonsCities { get; set; }
        public DbSet<PrivateLessonsTypes> PrivateLessonsTypes { get; set;}
        public DbSet<PrivateLessonsComments> PrivateLessonsComments { get; set; }
        public DbSet<PrivateLessonsRatings> PrivateLessonsRatings { get;set; }


    }

 
}
