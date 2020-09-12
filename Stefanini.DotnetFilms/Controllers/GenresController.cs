using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stefanini.DotnetFilms.Data;
using Stefanini.DotnetFilms.Dtos;
using System.Threading.Tasks;

namespace Stefanini.DotnetFilms.Controllers
{
    [ApiController]
    [Route("api/genres")]
    public class GenresController : Controller
    {
        private readonly FilmsDbContext _context;

        public GenresController(FilmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _context.Genres.ToListAsync();

            return Ok(new JsonResponse { Success = true, Message = "List retrieved with success", Data = genres });
        }
    }
}
