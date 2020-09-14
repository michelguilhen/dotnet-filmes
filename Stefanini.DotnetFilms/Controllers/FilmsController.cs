using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stefanini.DotnetFilms.Data;
using Stefanini.DotnetFilms.Dtos;
using Stefanini.DotnetFilms.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Stefanini.DotnetFilms.Controllers
{
    [ApiController]
    [Route("api/films")]
    public class FilmController : Controller
    {
        private readonly FilmsDbContext _context;

        public FilmController(FilmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilms()
        {
            var films = await _context.Films
                .Include(f => f.Genre)
                .ToListAsync();

            if (films.Count == 0)
            {
                return NotFound(new JsonResponse { Success = false, Message = "Could not find any film", Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "List retrieved with success", Data = films });
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetFilmById(int id)
        {
            var film = await _context.Films
                .Include(f => f.Genre)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (film == null)
            {
                return NotFound(new JsonResponse { Success = false, Message = "Could not find any film with informed id", Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "Found film with success", Data = film });
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> FilterFilms(string title, string genre)
        {
            var films = await _context.Films
                .Include(f => f.Genre)
                .Where(f => (string.IsNullOrEmpty(title) || f.Title.Contains(title)) &&
                            (string.IsNullOrEmpty(genre) || f.Genre.Description == genre)).ToListAsync();

            if (films.Count == 0)
            {
                return Ok(new JsonResponse { Success = false, Message = "Could not find any film with these params", Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "List retrieved with success", Data = films });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFilm(Film film)
        {
            _context.Entry(film.Genre).State = EntityState.Unchanged;

            _context.Films.Add(film);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new JsonResponse { Success = false, Message = e.Message, Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "Film registered with success", Data = film });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFilm(Film film)
        {
            var existingFilm = await _context.Films
                .Include(f => f.Genre)
                .FirstOrDefaultAsync(f => f.Id == film.Id);

            if (existingFilm == null)
            {
                return NotFound(new JsonResponse { Success = false, Message = "Impossible to update, film was not found", Data = null });
            }

            _context.Entry(existingFilm).CurrentValues.SetValues(film);

            existingFilm.Genre = film.Genre;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new JsonResponse { Success = false, Message = e.Message, Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "Film updated with success", Data = existingFilm });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);

            if (film == null)
            {
                return NotFound();
            }

            _context.Films.Remove(film);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new JsonResponse { Success = false, Message = e.Message, Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "Film deleted with success", Data = null });
        }
    }
}
