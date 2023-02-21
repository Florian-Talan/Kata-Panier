import { ProduitFactory } from './../factory/produit.factory';
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
   * Supprime un produit du panier
   *
   * @param id id du produit à supprimer
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
  addOrUpdate(produit: Produit) {
    const produits = this.updatePanierItem(this.panier$.value, produit);
    this.panier$.next(produits);
  }

  private updatePanierItem(initial: Produit[], element: Produit): Produit[] {
    const result = [...initial];
    const index = initial.findIndex((e) => e.id === element.id);
    if (index >= 0) {
      result[index] = element;
    } else {
      result.push(element);
    }
    return result;
  }

  private deletePanierItem(initial: Produit[], id: number): Produit[] {
    return initial.filter((p) => p.id !== id);
  }
}
