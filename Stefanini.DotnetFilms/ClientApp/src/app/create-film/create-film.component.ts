import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/services/film.service';
import { GenreService } from '../shared/services/genre.service';
import { Film } from '../shared/models/film.model';
import { Genre } from '../shared/models/genre.model';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css']
})
export class CreateFilmComponent implements OnInit {
  public genres: Genre[];
  public film: Film;
  public selectedGenreId: number;

  constructor(private filmService: FilmService, private genreService: GenreService) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(res => {
      if (res.success) {
        this.genres = res.data as Genre[];
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
      console.log(`Erro: ${err}`);
    });
  }

  public createFilm(film: Film) {

  }

  public submit() {
    //this.film.genre = this.genres.find(f => f.id == this.selectedGenreId);
    const gender = this.genres.find(f => f.id == this.selectedGenreId);
    console.log(gender);
  }
}
