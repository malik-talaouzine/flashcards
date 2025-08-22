using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Flashcard;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class FlashcardRepository : IFlashcardRepository
    {
        private readonly ApplicationDBContext _context;
        public FlashcardRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Flashcard> CreateAsync(Flashcard flashcardModel)
        {
            await _context.Flashcards.AddAsync(flashcardModel);
            await _context.SaveChangesAsync();
            return flashcardModel;
        }

        public async Task<Flashcard?> DeleteAsync(int id, string userId)
        {
            var flashcardModel = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (flashcardModel == null)
            {
                return null;
            }
            _context.Flashcards.Remove(flashcardModel);
            await _context.SaveChangesAsync();
            return flashcardModel;
        }

        public async Task<List<Flashcard>> GetAllByUserIdAsync(string userId)
        {
            return await _context.Flashcards.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Flashcard?> GetByIdAsync(int id, string userId)
        {
            return await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        }

        public async Task<List<Flashcard>> GetDueTodayByUserIdAsync(string userId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Flashcards
                .Where(f => f.UserId == userId && f.NextQuery <= today)
                .ToListAsync();
        }

        public async Task<Flashcard?> UpdateAsync(int id, UpdateFlashcardRequestDto flashcardDto, string userId)
        {
            var existingFlashcard = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            if (existingFlashcard == null)
            {
                return null;
            }

            existingFlashcard.Question = flashcardDto.Question;
            existingFlashcard.Answer = flashcardDto.Answer;

            existingFlashcard.NextQuery = DateOnly.FromDateTime(DateTime.Today.AddDays(3 * flashcardDto.Level));
            existingFlashcard.Level = flashcardDto.Level;

            await _context.SaveChangesAsync();
            return existingFlashcard;
        }

        public async Task<Flashcard?> UpdateContentAsync(int id, UpdateFlashcardContentRequestDto flashcardDto, string userId)
        {
            var existingFlashcard = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            if (existingFlashcard == null)
            {
                return null;
            }

            existingFlashcard.Question = flashcardDto.Question;
            existingFlashcard.Answer = flashcardDto.Answer;

            await _context.SaveChangesAsync();
            return existingFlashcard;
        }

        public async Task<Flashcard?> UpdateLevelAsync(int id, UpdateFlashcardLevelRequestDto flashcardDto, string userId)
        {
            var existingFlashcard = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            if (existingFlashcard == null)
            {
                return null;
            }

            existingFlashcard.NextQuery = DateOnly.FromDateTime(DateTime.Today.AddDays(3 * flashcardDto.Level));
            existingFlashcard.Level = flashcardDto.Level;

            await _context.SaveChangesAsync();
            return existingFlashcard;
        }
    }
}