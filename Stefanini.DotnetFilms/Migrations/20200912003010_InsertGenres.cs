using Microsoft.EntityFrameworkCore.Migrations;

namespace Stefanini.DotnetFilms.Migrations
{
    public partial class InsertGenres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Genres", "Description", new object[] { "Ação", "Animação", "Aventura", "Comédia", "Drama", "Fantasia", "Ficção", "Guerra", "Musical", "Romance", "Suspense", "Terror" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("Genres", "GenreId", null);
        }
    }
}
