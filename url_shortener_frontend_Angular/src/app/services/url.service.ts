// src/app/services/url.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8080/shorten';

  constructor(private http: HttpClient) {}

  shortenUrl(originalUrl: string): Observable<string> {
    const params = new HttpParams().set('originalUrl', originalUrl);
    return this.http.post(this.apiUrl, null, { params, responseType: 'text' });
   
  }
}
