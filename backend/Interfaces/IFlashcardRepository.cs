using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Flashcard;
using backend.Models;

namespace backend.Interfaces
{
    public interface IFlashcardRepository
    {
        Task<List<Flashcard>> GetAllAsync();
        Task<Flashcard?> GetByIdAsync(int id);
        Task<Flashcard> CreateAsync(Flashcard flashcardModel);
        Task<Flashcard?> UpdateContentAsync(int id, UpdateFlashcardContentRequestDto FlashcardDto);
        Task<Flashcard?> UpdateLevelAsync(int id, UpdateFlashcardLevelRequestDto FlashcardDto);
        Task<Flashcard?> DeleteAsync(int id);
    }
}