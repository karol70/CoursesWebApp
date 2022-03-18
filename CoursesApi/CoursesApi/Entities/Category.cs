﻿using System.ComponentModel.DataAnnotations;

namespace CoursesApi.Entities
{
    public class Category
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string CategoryImage { get; set; }
    }
}
