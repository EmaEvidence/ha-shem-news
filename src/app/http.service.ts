import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { News } from './types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getNews(query: string): Observable<News> {
    return this._http.get<News>(`https://newsapi.org/v2/${query}&pageSize=100&apiKey=47c93a41cca24b79a9c7f5ed527df1a8`);
  }
}
