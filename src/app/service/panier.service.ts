import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  readonly panier$: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>(
    []
  );

  /**
   * Get products in basket
   *
   * @returns the observable with selected product
   */
  get(): BehaviorSubject<Produit[]> {
    return this.panier$;
  }

  /**
   * Update products in basket
   *
   * @param produit produit to add if doesn't exist or update if exist
   *
   */
  updateOne(produit: Produit) {
    const produits = this.addOrUpdate(this.panier$.value, produit);
    this.panier$.next(produits);
  }

  private addOrUpdate(initial: Produit[], element: Produit): Produit[] {
    const result = [...initial];
    const index = initial.findIndex((e) => e.id === element.id);
    if (index >= 0) {
      result[index] = element;
    } else {
      result.push(element);
    }
    return result;
  }
}
