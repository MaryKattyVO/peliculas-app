import { Injectable } from '@angular/core';
import { HttpClient } from '@ANGULAR/common/http';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient) { }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=32e4b12b2832b65a2d406165f208b0ef&language=es-ES&page=1')
  }
}
