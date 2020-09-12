namespace Stefanini.DotnetFilms.Models
{
    public class Film
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string Synopsis { get; set; }
        public int Release { get; set; }
        public Genre Genre { get; set; }
    }
}
