import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/services/film.service';
import { Film } from '../shared/models/film.model';

@Component({
  selector: 'app-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css']
})
export class FilmsTableComponent implements OnInit {
  public films: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getFilms().subscribe(res => {
      if (res.success) {
        this.films = res.data as Film[];
      }
      else {
        console.log(`Erro: ${res.message}`);
      }
    }, err => {
        console.log(`Erro: ${err}`);
    })
  }
}
