import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';

// Services
import { FilmService } from './shared/services/film.service'
import { GenreService } from './shared/services/genre.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilmsTableComponent } from './components/films-table/films-table.component';
import { CreateFilmComponent } from './components/create-film/create-film.component';
import { FilmComponent } from './components/film/film.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmationModalComponent } from './shared/modals/modal/confirmation-modal.component';
import { AlertModalComponent } from './shared/modals/confirmation-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsTableComponent,
    CreateFilmComponent,
    FilmComponent,
    LoadingSpinnerComponent,
    ConfirmationModalComponent,
    AlertModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    FilmService,
    GenreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
