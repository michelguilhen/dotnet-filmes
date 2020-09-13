import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/services/film.service';
import { GenreService } from '../shared/services/genre.service';
import { Film } from '../shared/models/film.model';
import { Genre } from '../shared/models/genre.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  public genres: Genre[];
  public movie: Film;

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

    this.filmService.getFilmById(1).subscribe(res => {
      if (res.success) {
        this.movie = res.data as Film;
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
        console.log(`Erro: ${err}`);
    })
  }

  public createFilm(film: Film) {

  }
}
