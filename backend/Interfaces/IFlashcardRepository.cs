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
        Task<List<Flashcard>> GetAllByUserIdAsync(string userId);
        Task<List<Flashcard>> GetDueTodayByUserIdAsync(string userId);

        Task<Flashcard?> GetByIdAsync(int id, string userId);
        Task<Flashcard> CreateAsync(Flashcard flashcardModel);
        Task<Flashcard?> UpdateAsync(int id, UpdateFlashcardRequestDto FlashcardDto, string userId);
        Task<Flashcard?> UpdateContentAsync(int id, UpdateFlashcardContentRequestDto FlashcardDto, string userId);
        Task<Flashcard?> UpdateLevelAsync(int id, UpdateFlashcardLevelRequestDto FlashcardDto, string userId);
        Task<Flashcard?> DeleteAsync(int id, string userId);
    }
}