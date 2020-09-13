import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';

import { FilmService } from './shared/services/film.service'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilmsTableComponent } from './films-table/films-table.component';
import { CreateFilmComponent } from './create-film/create-film.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsTableComponent,
    CreateFilmComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    FilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
