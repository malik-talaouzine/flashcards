using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Mappers;
using backend.Dtos.Flashcard;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("flashcards")]
    [ApiController]
    public class FlashcardController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IFlashcardRepository _flashcardRepo;

        public FlashcardController(ApplicationDBContext context, IFlashcardRepository flashcardRepo)
        {
            _flashcardRepo = flashcardRepo;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flashcards = await _flashcardRepo.GetAllAsync();
            var flashcardDto = flashcards.Select(s => s.ToFlashcardDto());
            return Ok(flashcardDto);
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var flashcard = await _flashcardRepo.GetByIdAsync(id);

            if (flashcard == null)
            {
                return NotFound();
            }

            return Ok(flashcard.ToFlashcardDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFlashcardRequestDto flashcardDto)
        {
            var flashcardModel = flashcardDto.ToFlashcardFromCreateDto();
            await _flashcardRepo.CreateAsync(flashcardModel);
            return CreatedAtAction(nameof(GetById), new { id = flashcardModel.Id }, flashcardModel.ToFlashcardDto());
        }

        [Authorize]
        [HttpPut]
        [Route("{id:int}/content")]
        public async Task<IActionResult> UpdateContent([FromRoute] int id, [FromBody] UpdateFlashcardContentRequestDto updateFlashcardDto)
        {
            var flashcardModel = await _flashcardRepo.UpdateContentAsync(id, updateFlashcardDto);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            return Ok(flashcardModel.ToFlashcardDto());
        }

        [Authorize]
        [HttpPut]
        [Route("{id:int}/level")]
        public async Task<IActionResult> UpdateLevel([FromRoute] int id, [FromBody] UpdateFlashcardLevelRequestDto updateFlashcardDto)
        {
            if (updateFlashcardDto.Level < 0 || updateFlashcardDto.Level > 5)
                return BadRequest("Level must be between 0 and 5.");

            var flashcardModel = await _flashcardRepo.UpdateLevelAsync(id, updateFlashcardDto);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            return Ok(flashcardModel.ToFlashcardDto());
        }

        [Authorize]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var flashcardModel = await _flashcardRepo.DeleteAsync(id);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}