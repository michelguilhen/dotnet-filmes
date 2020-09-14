import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/services/film.service';
import { Film } from '../shared/models/film.model';
import { Genre } from '../shared/models/genre.model';
import { Router } from '@angular/router';
import { GenreService } from '../shared/services/genre.service';

@Component({
  selector: 'app-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css']
})
export class FilmsTableComponent implements OnInit {
  public films: Film[];
  public genres: Genre[];
  public loading: boolean = true;
  public deleteId: number;
  public abrirModal: boolean;
  public filmSearch: string;
  public genreSearch: string = 'Todos';

  constructor(private filmService: FilmService, private genreService: GenreService, private router: Router) { }

  ngOnInit() {
    this.getGenres();
    this.getFilms();
  }

  public getFilms() {
    this.filmService.getFilms().subscribe(res => {
      if (res.success) {
        this.films = res.data as Film[];
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
      this.loading = false;
    }, err => {
      console.log(`Erro: ${err}`);
      this.loading = false;
    });
  }

  public getGenres() {
    this.genreService.getGenres().subscribe(res => {
      if (res.success) {
        this.genres = res.data as Genre[];
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
      console.log(err);
    });
  }

  public searchFilms() {
    let title: string;
    let genre: string;
    const data: any = {};

    !this.filmSearch ? title = '' : title = this.filmSearch;
    this.genreSearch === 'Todos' ? genre = '' : genre = this.genreSearch;

    if (!title && !genre) {
      this.ngOnInit();
      this.router.navigate(['/'], { queryParams: data });
      return;
    }

    if (title) data.title = title;
    if (genre) data.genre = genre;

    this.router.navigate(['/'], { queryParams: data });
    this.filmService.getFilmsWithFilter(title, genre).subscribe(res => {
      if (res.success) {
        this.films = res.data as Film[];
      }
      else {
        this.films = null;
      }
    }, err => {
        console.log(`Erro: ${err}`);
    });
  }

  public loadFilm(id: number) {
    this.router.navigate(['/films/' + id]);
  }

  public editFilm(id: number) {
    this.router.navigate(['films/' + id], { queryParams: { editMode: true } });
  }

  public deleteFilm(id: number) {
    this.filmService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.ngOnInit();
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
      console.log(`Erro: ${err}`);
    });
  }

  public onCloseModal(del: boolean) {
    this.abrirModal = false;
    if (del) {
      this.deleteFilm(this.deleteId);
    }
  }
}
