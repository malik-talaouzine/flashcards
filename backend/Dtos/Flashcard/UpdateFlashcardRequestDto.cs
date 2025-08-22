using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Flashcard
{
    public class UpdateFlashcardRequestDto
    {
        [Required]
        [Range(0, 5, ErrorMessage = "Level must be between 0 and 5.")]
        public int Level { get; set; } = 0;
        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;
    }
    public class UpdateFlashcardContentRequestDto
    {
        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;
    }

    public class UpdateFlashcardLevelRequestDto
    {
        [Required]
        [Range(0, 5, ErrorMessage = "Level must be between 0 and 5.")]
        public int Level { get; set; } = 0;
    }
}