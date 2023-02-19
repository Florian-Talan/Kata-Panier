import { produitsWS } from './../data/produit.data';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produit } from '../model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  getAll(): Observable<Produit[]> {
    return of(produitsWS);
  }
}
