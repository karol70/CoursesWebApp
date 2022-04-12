using AutoMapper;
using CoursesApi.DTOs;
using CoursesApi.Entities;

namespace CoursesApi.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CategoryDTO, CourseCategory>().ReverseMap();
            CreateMap<CategoryDTO, PrivateLessonsCategory>().ReverseMap();

            CreateMap<CourseCreationDTO, Course>()
               .ForMember(x => x.Image, options => options.Ignore())
               .ForMember(x => x.ContactNumber, options => options.MapFrom(dto => dto.ContactTelephoneNumber))
               .ForMember(x => x.CourseHomePage, options => options.MapFrom(dto => dto.CourseHomePage))
               .ForMember(x => x.Name, options => options.MapFrom(dto => dto.Title))
               .ForMember(x => x.CourseCategoryCourse, options => options.MapFrom(MapCoursesCategories))
               .ForMember(x => x.CourseCity, options => options.MapFrom(MapCoursesCities))
               .ForMember(x => x.CourseType, options => options.MapFrom(MapCoursesTypes))
               .ForMember(x => x.UserId, options => options.Ignore()).ReverseMap();

            CreateMap<Course, CourseDetailsDTO>()
                .ForMember(x => x.CategoryName, options => options.MapFrom(dto => dto.CourseCategoryCourse.Course.Name))
                .ForMember(x => x.TypeName, options => options.MapFrom(dto => dto.CourseType.Type.Name))
                .ForMember(x => x.CityName, options => options.MapFrom(dto => dto.CourseCity.City.Name))
                .ForMember(x => x.CategoryId, options => options.Ignore())
                .ForMember(x => x.CityId, options => options.Ignore())
                .ForMember(x => x.TypeId, options => options.Ignore());


            CreateMap<Course, CoursesDTO>()
                .ForMember(x => x.Category, options => options.MapFrom(dto => dto.CourseCategoryCourse.CourseCategory))
                .ForMember(x => x.Type, options => options.MapFrom(dto => dto.CourseType.Type))
                .ForMember(x => x.City, options => options.MapFrom(dto => dto.CourseCity.City));


            CreateMap<CourseCreationDTO, PrivateLesson>()
               .ForMember(x => x.Image, options => options.Ignore())
               .ForMember(x => x.ContactNumber, options => options.MapFrom(dto => dto.ContactTelephoneNumber))
               .ForMember(x => x.CourseHomePage, options => options.MapFrom(dto => dto.CourseHomePage))
               .ForMember(x => x.Name, options => options.MapFrom(dto => dto.Title))
               .ForMember(x => x.PrivateLessonsCategoryPrivateLesson, options => options.MapFrom(MapPrivateLessonsCategories))
               .ForMember(x => x.PrivateLessonsCiti, options => options.MapFrom(MapPrivateLessonsCities))
               .ForMember(x => x.PrivateLessonsType, options => options.MapFrom(MapPrivateLessonsTypes))
               .ForMember(x => x.UserId, options => options.Ignore()).ReverseMap();

            CreateMap<PrivateLesson, CourseDetailsDTO>()
                .ForMember(x => x.CategoryName, options => options.MapFrom(dto => dto.PrivateLessonsCategoryPrivateLesson.PrivateLesson.Name))
                .ForMember(x => x.TypeName, options => options.MapFrom(dto => dto.PrivateLessonsType.Type.Name))
                .ForMember(x => x.CityName, options => options.MapFrom(dto => dto.PrivateLessonsCiti.City.Name))
                .ForMember(x => x.CategoryId, options => options.Ignore())
                .ForMember(x => x.CityId, options => options.Ignore())
                .ForMember(x => x.TypeId, options => options.Ignore());


            CreateMap<PrivateLesson, PrivateLessonsDTO>()
                .ForMember(x => x.Category, options => options.MapFrom(dto => dto.PrivateLessonsCategoryPrivateLesson.PrivateLessonsCategory))
                .ForMember(x => x.Type, options => options.MapFrom(dto => dto.PrivateLessonsType.Type))
                .ForMember(x => x.City, options => options.MapFrom(dto => dto.PrivateLessonsCiti.City));



            CreateMap<TypeCreationDTO, Entities.Type>().ReverseMap();
            CreateMap<CourseComments, CourseCommentDTO>()
                .ForMember(x => x.UserName, options => options.Ignore()).ReverseMap();

            CreateMap<PrivateLessonsComments, CourseCommentDTO>()
                .ForMember(x => x.UserName, options => options.Ignore())
                .ForMember(x => x.CourseId, options => options.MapFrom(dto => dto.PrivateLessonId))
                .ReverseMap();

        }

        private CourseCategoriesCourses MapCoursesCategories(CourseCreationDTO courseCreationDTO, Course course)
        {
            var result = new CourseCategoriesCourses() { };
            if(courseCreationDTO.CategoryId == null) { return result; }

            result = new CourseCategoriesCourses { CourseCategoryId = courseCreationDTO.CategoryId };
            return result;
        }

        private CoursesCities MapCoursesCities(CourseCreationDTO courseCreationDTO, Course course)
        {
            var result = new CoursesCities() { };
            if (courseCreationDTO.CityId == null) { return result; }

            result = new CoursesCities { CityId = courseCreationDTO.CityId };
            return result;
        }

        private CoursesTypes MapCoursesTypes(CourseCreationDTO courseCreationDTO, Course course)
        {
            var result = new CoursesTypes() { };
            if (courseCreationDTO.TypeId == null) { return result; }

            result = new CoursesTypes { TypeId = courseCreationDTO.TypeId };
            return result;
        }



        private PrivateLessonsCategoryPrivateLesson MapPrivateLessonsCategories(CourseCreationDTO courseCreationDTO, PrivateLesson privateLesson)
        {
            var result = new PrivateLessonsCategoryPrivateLesson() { };
            if (courseCreationDTO.CategoryId == null) { return result; }

            result = new PrivateLessonsCategoryPrivateLesson { PrivateLessonsCategoryId = courseCreationDTO.CategoryId };
            return result;
        }

        private PrivateLessonsCities MapPrivateLessonsCities(CourseCreationDTO courseCreationDTO, PrivateLesson privateLesson)
        {
            var result = new PrivateLessonsCities() { };
            if (courseCreationDTO.CityId == null) { return result; }

            result = new PrivateLessonsCities { CityId = courseCreationDTO.CityId };
            return result;
        }

        private PrivateLessonsTypes MapPrivateLessonsTypes(CourseCreationDTO courseCreationDTO, PrivateLesson privateLesson)
        {
            var result = new PrivateLessonsTypes() { };
            if (courseCreationDTO.TypeId == null) { return result; }

            result = new PrivateLessonsTypes { TypeId = courseCreationDTO.TypeId };
            return result;
        }

    }

}
