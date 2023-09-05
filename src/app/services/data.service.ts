import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private limit = 3;
  urlBase = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {
  }

  getEntries(page: number = 0) {
    return this.http.get(`${this.urlBase}pokemon?limit=${this.limit}&offset=${this.limit * page}`);
  }

  simulateRequest(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = true;

        if (exito) {
          resolve('La acción se completó con éxito.');
        } else {
          reject('Ocurrió un error al realizar la acción.');
        }
      }, 2000);
    });
  }
}
