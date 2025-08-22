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
        private readonly IFlashcardRepository _flashcardRepo;
        private string? UserId => User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        public FlashcardController(IFlashcardRepository flashcardRepo)
        {
            _flashcardRepo = flashcardRepo;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcards = await _flashcardRepo.GetAllByUserIdAsync(UserId);
            var flashcardDto = flashcards.Select(s => s.ToFlashcardDto());
            return Ok(flashcardDto);
        }

        [Authorize]
        [HttpGet("due-today")]
        public async Task<IActionResult> GetAllByDate()
        {
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcards = await _flashcardRepo.GetDueTodayByUserIdAsync(UserId);
            var flashcardDto = flashcards.Select(s => s.ToFlashcardDto());
            return Ok(flashcardDto);
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcard = await _flashcardRepo.GetByIdAsync(id, UserId);

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
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();
            
            var flashcardModel = flashcardDto.ToFlashcardFromCreateDto();
            flashcardModel.UserId = UserId;
            await _flashcardRepo.CreateAsync(flashcardModel);
            return CreatedAtAction(nameof(GetById), new { id = flashcardModel.Id }, flashcardModel.ToFlashcardDto());
        }

        [Authorize]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateFlashcardRequestDto updateFlashcardDto)
        {
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcardModel = await _flashcardRepo.UpdateAsync(id, updateFlashcardDto, UserId);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            return Ok(flashcardModel.ToFlashcardDto());
        }

        [Authorize]
        [HttpPut]
        [Route("{id:int}/content")]
        public async Task<IActionResult> UpdateContent([FromRoute] int id, [FromBody] UpdateFlashcardContentRequestDto updateFlashcardDto)
        {
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcardModel = await _flashcardRepo.UpdateContentAsync(id, updateFlashcardDto, UserId);

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
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            if (updateFlashcardDto.Level < 0 || updateFlashcardDto.Level > 5)
                return BadRequest("Level must be between 0 and 5.");

            var flashcardModel = await _flashcardRepo.UpdateLevelAsync(id, updateFlashcardDto, UserId);

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
            if (string.IsNullOrEmpty(UserId)) return Unauthorized();

            var flashcardModel = await _flashcardRepo.DeleteAsync(id, UserId);

            if (flashcardModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}