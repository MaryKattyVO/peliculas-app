import { Injectable } from '@angular/core';
import { HttpClient } from '@ANGULAR/common/http';
import { Observable, of} from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CredistResponse } from '../interfaces/credits.response';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;
  constructor( private http: HttpClient) { }

  get params() {
    return {
      api_key: '32e4b12b2832b65a2d406165f208b0ef',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    
    if( this.cargando ) {
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseUrl}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
  }

  buscarPeliculas( texto: string): Observable<Movie[]> {

    const params = { ...this.params, page: 1, query: texto}
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    )
  }

  getPeliculaDetalle( id: string) {
    console.log(id)
    
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );
  }
  getCast( id: string){
    return this.http.get<CredistResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([])),
    );
  }
}
