using System.ComponentModel.DataAnnotations;

namespace Stefanini.DotnetFilms.Models
{
    public class Film
    {
        public long Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Director { get; set; }
        public string Synopsis { get; set; }
        public int? Release { get; set; }
        [Required]
        public Genre Genre { get; set; }
    }
}
