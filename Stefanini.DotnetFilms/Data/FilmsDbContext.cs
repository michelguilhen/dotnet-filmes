using Microsoft.EntityFrameworkCore;
using Stefanini.DotnetFilms.Models;

namespace Stefanini.DotnetFilms.Data
{
    public class FilmsDbContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=12345;Persist Security Info=True;User ID=sa;Initial Catalog=FilmsDatabase;Data Source=DESKTOP-2R2U4M2");
        }
    }
}
