import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmComponent } from './film/film.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmsTableComponent } from './films-table/films-table.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsTableComponent,
  },
  {
    path: 'films/:id',
    component: FilmComponent,
  },
  {
    path: 'cadastrar-filme',
    component: CreateFilmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
