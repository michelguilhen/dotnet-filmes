import { GlobalConstants } from '../common/global.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/json/jsonResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  private readonly _rootUrl: string = GlobalConstants.baseApiUrl + '/films';

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this._rootUrl);
  }

  public getFilmById(id: number): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this._rootUrl + '/' + id);
  }
}
