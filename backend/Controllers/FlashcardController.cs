using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Mappers;

namespace backend.Controllers
{
    [Route("flashcards")]
    [ApiController]
    public class FlashcardController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public FlashcardController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var flashcards = _context.Flashcards.Select(s => s.ToFlashcardDto()).ToList();
            return Ok(flashcards);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var flashcard = _context.Flashcards.Find(id);

            if (flashcard == null)
            {
                return NotFound();
            }

            return Ok(flashcard.ToFlashcardDto());
        }
    }
}