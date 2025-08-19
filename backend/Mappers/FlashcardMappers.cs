using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Dtos.Flashcard;

namespace backend.Mappers
{
    public static class FlashcardMappers
    {
        public static FlashcardDto ToFlashcardDto(this Flashcard flashcardModel)
        {
            return new FlashcardDto
            {
                Id = flashcardModel.Id,
                CreatedAt = flashcardModel.CreatedAt,
                NextQuery = flashcardModel.NextQuery,
                Level = flashcardModel.Level,
                Question = flashcardModel.Question,
                Answer = flashcardModel.Answer
            };
        }

        public static Flashcard ToFlashcardFromCreateDto(this CreateFlashcardRequestDto flashcardDto)
        {
            return new Flashcard
            {
                Question = flashcardDto.Question,
                Answer = flashcardDto.Answer
            };
        }
    }
}