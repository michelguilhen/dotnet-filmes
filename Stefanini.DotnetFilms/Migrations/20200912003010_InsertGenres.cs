using Microsoft.EntityFrameworkCore.Migrations;

namespace Stefanini.DotnetFilms.Migrations
{
    public partial class InsertGenres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Genres", "Description", new object[] { "Action", "Animation", "Adventure", "Comedy", "Drama", "Fantasy", "Fiction", "Horror", "Musical", "Romance", "Thriller", "War" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("Genres", "GenreId", null);
        }
    }
}
