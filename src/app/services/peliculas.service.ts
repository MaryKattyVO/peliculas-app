import { Injectable } from '@angular/core';
import { HttpClient } from '@ANGULAR/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  constructor( private http: HttpClient) { }

  get params() {
    return {
      api_key: '32e4b12b2832b65a2d406165f208b0ef',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(`${ this.baseUrl}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      tap( () => {
        this.carteleraPage += 1;
      })
    )
  }
}
