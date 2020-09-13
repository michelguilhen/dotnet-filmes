import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Services
import { FilmService } from './shared/services/film.service'
import { GenreService } from './shared/services/genre.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilmsTableComponent } from './films-table/films-table.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmComponent } from './film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsTableComponent,
    CreateFilmComponent,
    FilmComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FilmService,
    GenreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
