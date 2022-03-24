namespace CoursesApi.Entities
{
    public class PrivateLesson
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Plan { get; set; }
        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }
        public string Image { get; set; }

        public int PrivateLessonsCategoryId { get; set; }
        public virtual PrivateLessonsCategory Category { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public int TypeId { get; set; }
        public virtual Type Type { get; set; }
    }
}
