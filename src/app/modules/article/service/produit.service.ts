import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produit } from '../model/produit.model';
import { HttpClient } from '@angular/common/http';
import { TaxService } from './tax.service';

@Injectable()
export class ProduitService {
  readonly API_PATH = 'produits';

  constructor(private http: HttpClient, private taxService: TaxService) {}

  /**
   * Call WS to get all produits
   * Note: TTC price should be calculated by the api?
   *
   * @returns observable with all produits
   */
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API_PATH}`).pipe(
      map((list) =>
        list.map((p: Produit) => {
          return {
            ...p,
            ttcPrice: this.taxService.getTTCPrice(p),
          };
        })
      )
    );
  }
}
