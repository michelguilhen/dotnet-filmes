import { GlobalConstants } from '../common/global.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/json/jsonResponse';
import { Injectable } from '@angular/core';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  private readonly _rootUrl: string = GlobalConstants.baseApiUrl + '/films/';

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this._rootUrl);
  }

  public getFilmById(id: number): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this._rootUrl + id);
  }

  public getFilmsWithFilter(title: string, genre: string): Observable<JsonResponse> {
    const data: any = { };

    if (title) data.title = title;
    if (genre) data.genre = genre;

    return this.http.get<JsonResponse>(this._rootUrl + 'search', { params: data });
  }

  public deleteById(id: number): Observable<JsonResponse> {
    return this.http.delete<JsonResponse>(this._rootUrl + id);
  }

  public createFilm(film: Film): Observable<JsonResponse> {
    return this.http.post<JsonResponse>(this._rootUrl, film);
  }

  public editFilm(film: Film): Observable<JsonResponse> {
    return this.http.put<JsonResponse>(this._rootUrl, film);
  }
}
