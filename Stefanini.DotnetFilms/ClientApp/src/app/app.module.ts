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
import { NavbarComponent } from './navbar/navbar.component';
import { FilmsTableComponent } from './films-table/films-table.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { FilmComponent } from './film/film.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsTableComponent,
    CreateFilmComponent,
    FilmComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    ConfirmationModalComponent,
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
