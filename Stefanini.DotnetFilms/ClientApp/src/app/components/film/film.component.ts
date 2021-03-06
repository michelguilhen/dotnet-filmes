import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { GenreService } from '../../shared/services/genre.service';
import { Film } from '../../shared/models/film.model';
import { Genre } from '../../shared/models/genre.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  public genres: Genre[];
  public film: Film;
  public loading: boolean = true;
  private id: number;
  private editMode: boolean;
  public currentGenre: string;
  public selectedGenreId: number;
  public abrirModal: boolean;
  public message: string;

  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.activatedRoute.snapshot.queryParamMap.get('editMode')) {
        this.editMode = true;
      }
      else {
        this.editMode = false;
      }

      this.getFilm(this.id);
      this.getGenres();
      this.loading = false;
    });
  }

  public initFilm() {

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
      console.log(`Erro: ${err}`);
    });
  }

  public getFilm(id: number) {
    this.filmService.getFilmById(id).subscribe(res => {
      if (res.success) {
        this.film = res.data as Film;
        this.currentGenre = this.film.genre.description;
        this.selectedGenreId = this.film.genre.id;
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
      console.log(`Erro: ${err}`);
    });
  }

  public editFilm(form: NgForm) {
    this.loading = true;
    const film: Film = form.value;
    film.genre = this.genres.find(f => f.id == this.selectedGenreId);

    if (form.value.release == '') {
      film.release = null;
    }
    else {
      film.release = +film.release;
    }

    this.filmService.editFilm(film).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.message = 'Filme alterado com sucesso!';
        this.abrirModal = true;
      } 
    }, err => {
        this.message = 'Falha ao alterar filme!';
        this.abrirModal = true;
        this.loading = false;
    });
  }

  public onCloseModal() {
    this.abrirModal = false;
    this.router.navigate(['/']);
  }
}
