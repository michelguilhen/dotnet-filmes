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
            var films = await _context.Films.ToListAsync();

            return Ok(new JsonResponse { Success = true, Message = "List retrieved with success", Data = films });
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
                return NotFound(new JsonResponse { Success = false, Message = "Could not find any film with these params", Data = null });
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
        [Route("{id}")]
        public async Task<IActionResult> UpdateFilm(int id, Film film)
        {
            var existingFilm = await _context.Films
                .Include(f => f.Genre)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (existingFilm == null)
            {
                return NotFound(new JsonResponse { Success = false, Message = "Impossible to update, film was not found", Data = null });
            }

            existingFilm.Title = film.Title;
            existingFilm.Synopsis = film.Synopsis;
            existingFilm.Release = film.Release;
            existingFilm.Director = film.Director;

            if (existingFilm.Genre.Id != film.Genre.Id)
            {
                existingFilm.Genre.Id = film.Genre.Id;
                existingFilm.Genre.Description = film.Genre.Description;
            }

            _context.Films.Update(existingFilm);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new JsonResponse { Success = false, Message = e.Message, Data = null });
            }

            return Ok(new JsonResponse { Success = true, Message = "Film updated with success", Data = film });
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
