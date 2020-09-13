import { GlobalConstants } from '../common/global.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/json/jsonResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GenreService {
  private readonly _rootUrl: string = GlobalConstants.baseApiUrl + '/genres';

  constructor(private http: HttpClient) { }

  public getGenres(): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(this._rootUrl);
  }
}
