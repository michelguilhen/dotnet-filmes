using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stefanini.DotnetFilms.Models;
using System.IO;

namespace Stefanini.DotnetFilms.Data
{
    public class FilmsDbContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build()
                    .GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
