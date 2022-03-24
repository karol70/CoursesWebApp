using CoursesApi.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace CoursesApi.DTOs
{
    public class CourseCreationDTO
    {

    public string Title { get; set; }
   
    public IFormFile? Image { get; set; }
    public string Description { get; set; }
    public string? Plan { get; set; }
    public string ContactEmail { get; set; }
    public string? ContactTelephoneNumber { get; set; }
    public string? mainPage { get; set; }
    
    public string? Price { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<int>))]
        public int CategoryId { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<int>))]
        public int TypeId { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<int>))]
        public int CityId  { get; set; }


    }
}
