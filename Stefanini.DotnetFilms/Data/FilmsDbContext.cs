using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stefanini.DotnetFilms.Models;

namespace Stefanini.DotnetFilms.Data
{
    public class FilmsDbContext : DbContext
    {
        public readonly IConfiguration _configuration;

        public FilmsDbContext(IConfiguration configuration) 
        {
            _configuration = configuration;
        }
        public DbSet<Film> Films { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("filmsDatabase"));
        }
    }
}
