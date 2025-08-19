using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Flashcard
{
    public class UpdateFlashcardContentRequestDto
    {
        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;
    }

    public class UpdateFlashcardLevelRequestDto
    {
        public int Level { get; set; } = 0;
    }
}