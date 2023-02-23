import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produit } from '../model/produit.model';
import { produitCategoryTaxe } from '../resource/category-taxe.data';
import { HttpClient } from '@angular/common/http';
import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';

@Injectable()
export class ProduitService {
  readonly API_PATH = 'produits';

  constructor(private http: HttpClient) {}

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
            ttcPrice: this.getTTCPrice(p.price, p.category, p.isImported),
          };
        })
      )
    );
  }

  private getTTCPrice(
    price: number,
    category: ProduitCategoryEnum,
    isImported: boolean
  ): number {
    return price + this.getTaxePrice(price, category, isImported);
  }

  /**
   * Get the taxe associated to the produit
   *
   * @param price initial price of the produit
   * @param category category of the produit
   * @param isImported if produit is imported
   * @returns the amount of the taxe
   */
  getTaxePrice(
    price: number,
    category: ProduitCategoryEnum,
    isImported: boolean
  ): number {
    return (
      Math.ceil(
        ((price * this.getProduitTaxe(category, isImported)) / 100) * 20
      ) / 20
    );
  }

  private getProduitTaxe(
    category: ProduitCategoryEnum,
    isImported: boolean
  ): number {
    let result = produitCategoryTaxe[category];
    if (isImported) {
      result += 5;
    }
    return result;
  }
}
