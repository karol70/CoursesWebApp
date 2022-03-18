using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Diagnostics.CodeAnalysis;

namespace CoursesApi.Entities
{
    public class CoursesDbContext: DbContext
    {
        
        public CoursesDbContext(DbContextOptions<CoursesDbContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<CourseType> CourseTypes { get; set; }

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

            modelBuilder.Entity<Course>()
                .Property(c => c.ContactNumber)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }      

        
    }

    public class CoursesDbContextFactory : IDesignTimeDbContextFactory<CoursesDbContext>
    {
        public CoursesDbContext CreateDbContext(string[] args)
        {
            var connectionString = "server=localhost; database=CoursesAPI ;user=root ;password=''";

            var optionsBuilder = new DbContextOptionsBuilder<CoursesDbContext>();
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
            mySqlOptionsAction => mySqlOptionsAction.UseNetTopologySuite());

            return new CoursesDbContext(optionsBuilder.Options);
        }
    }
}
