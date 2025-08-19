using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Flashcard
{
    public class CreateFlashcardRequestDto
    {
        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;
    }
}