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
   * Delete a produit in panier
   *
   * @param id id of the produit to delete
   */
  delete(id: number): void {
    const produits = this.deletePanierItem(this.panier$.value, id);
    this.panier$.next(produits);
  }

  /**
   * Add or update produit in panier
   *
   * @param produit produit to add if doesn't exist or update if exist
   */
  addOrUpdate(produit: Produit, quantity: number) {
    const produits = this.updatePanierItem(
      this.panier$.value,
      produit,
      quantity
    );
    this.panier$.next(produits);
  }

  private updatePanierItem(
    initial: Produit[],
    produit: Produit,
    quantity: number
  ): Produit[] {
    const result = [...initial];
    const itemToAdd: Produit = {
      ...produit,
      quantity,
    };
    const index = initial.findIndex((e) => e.id === produit.id);
    if (index >= 0) {
      result[index] = itemToAdd;
    } else {
      result.push(itemToAdd);
    }
    return result;
  }

  private deletePanierItem(initial: Produit[], id: number): Produit[] {
    return initial.filter((p) => p.id !== id);
  }
}
