import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../shared/services/film.service';
import { GenreService } from '../../shared/services/genre.service';
import { Film } from '../../shared/models/film.model';
import { Genre } from '../../shared/models/genre.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css']
})
export class CreateFilmComponent implements OnInit {
  public genres: Genre[];
  public genre: Genre;
  public selectedGenreId: number;
  public abrirModal: boolean;
  public loading: boolean;
  public modalMessage: string;

  constructor(private filmService: FilmService, private genreService: GenreService, private router: Router) { }

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

  public createFilm(form: NgForm) {
    this.loading = true;
    const film: Film = form.value;
    film.genre = this.genres.find(f => f.id == this.selectedGenreId);

    if (form.value.release == '') {
      film.release = null;
    }
    this.filmService.createFilm(film).subscribe(res => {
      this.loading = false;
      this.abrirModal = true;
      this.modalMessage = 'Filme cadastrado com sucesso!';
    }, err => {
        this.loading = false;
        this.abrirModal = true;
        this.modalMessage = 'Erro ao cadastrar filme';
        console.log(`Erro: ${err}`);
    });
  }

  public closeModal() {
    this.abrirModal = false;
    this.router.navigate(['/']);
  }
}
