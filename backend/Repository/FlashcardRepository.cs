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

        public async Task<Flashcard?> DeleteAsync(int id)
        {
            var flashcardModel = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id);
            if (flashcardModel == null)
            {
                return null;
            }
            _context.Flashcards.Remove(flashcardModel);
            await _context.SaveChangesAsync();
            return flashcardModel;
        }

        public async Task<List<Flashcard>> GetAllAsync()
        {
            return await _context.Flashcards.ToListAsync();
        }

        public async Task<Flashcard?> GetByIdAsync(int id)
        {
            return await _context.Flashcards.FindAsync(id);
        }

        public async Task<Flashcard?> UpdateContentAsync(int id, UpdateFlashcardContentRequestDto flashcardDto)
        {
            var existingFlashcard = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id);

            if (existingFlashcard == null)
            {
                return null;
            }

            existingFlashcard.Question = flashcardDto.Question;
            existingFlashcard.Answer = flashcardDto.Answer;

            await _context.SaveChangesAsync();
            return existingFlashcard;
        }

        public async Task<Flashcard?> UpdateLevelAsync(int id, UpdateFlashcardLevelRequestDto flashcardDto)
        {
            var existingFlashcard = await _context.Flashcards.FirstOrDefaultAsync(x => x.Id == id);

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