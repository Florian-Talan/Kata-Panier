import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../model/produit.model';

@Injectable()
export class PanierService {
  readonly panier$: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>(
    []
  );

  /**
   * Get produits in panier
   *
   * @returns the observable with selected produits
   */
  get(): BehaviorSubject<Produit[]> {
    return this.panier$;
  }

  /**
   * Add or update produit in panier
   *
   * @param produit produit to add if doesn't exist or update if exist
   *
   */
  addOrUpdate(produit: Produit) {
    const produits = this.updatePanierList(this.panier$.value, produit);
    this.panier$.next(produits);
  }

  private updatePanierList(initial: Produit[], element: Produit): Produit[] {
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
