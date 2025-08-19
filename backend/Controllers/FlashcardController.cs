using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Mappers;
using backend.Dtos.Flashcard;

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

        [HttpPost]
        public IActionResult Create([FromBody] CreateFlashcardRequestDto flashcardDto)
        {
            var flashcardModel = flashcardDto.ToFlashcardFromCreateDto();
            _context.Flashcards.Add(flashcardModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = flashcardModel.Id }, flashcardModel.ToFlashcardDto());
        }

        [HttpPut]
        [Route("{id}/content")]
        public IActionResult UpdateContent([FromRoute] int id, [FromBody] UpdateFlashcardContentRequestDto updateFlashcardDto)
        {
            var flashcardModel = _context.Flashcards.FirstOrDefault(x => x.Id == id);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            flashcardModel.Question = updateFlashcardDto.Question;
            flashcardModel.Answer = updateFlashcardDto.Answer;

            _context.SaveChanges();

            return Ok(flashcardModel.ToFlashcardDto());
        }

        [HttpPut]
        [Route("{id}/level")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateFlashcardLevelRequestDto updateFlashcardDto)
        {
            if (updateFlashcardDto.Level < 0 || updateFlashcardDto.Level > 5)
                return BadRequest("Level must be between 0 and 5.");

            var flashcardModel = _context.Flashcards.FirstOrDefault(x => x.Id == id);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            flashcardModel.NextQuery = DateOnly.FromDateTime(DateTime.Today.AddDays(3 * updateFlashcardDto.Level));
            flashcardModel.Level = updateFlashcardDto.Level;

            _context.SaveChanges();

            return Ok(flashcardModel.ToFlashcardDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var flashcardModel = _context.Flashcards.FirstOrDefault(x => x.Id == id);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            _context.Flashcards.Remove(flashcardModel);

            _context.SaveChanges();

            return NoContent();
        }
    }
}