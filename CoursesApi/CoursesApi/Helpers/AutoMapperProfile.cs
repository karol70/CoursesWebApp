using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;

namespace CoursesApi.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CategoryDTO, Category>().ReverseMap();
        }
    }
}
