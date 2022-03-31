﻿using System.ComponentModel.DataAnnotations;

namespace CoursesApi.DTOs
{
    public class RatingDTO
    {
        [Range(1,5)]
        public int Rating { get; set; }
        public int CourseId { get; set; }
    }
}
