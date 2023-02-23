import { Produit } from './../model/produit.model';
import { Injectable } from '@angular/core';
import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';

type ProduitCategoryTaxe = {
  [key in ProduitCategoryEnum]: number;
};

const produitCategoryTaxe: ProduitCategoryTaxe = {
  Food: 0,
  Medecine: 0,
  Books: 10,
  Parfum: 20,
  Electric: 20,
};

@Injectable()
export class TaxService {
  readonly DEFAULT_TAX = 20;

  /**
   * Get the ttc price associated to the produit
   *
   * @param produit produit to get the ttc price
   * @returns the amount of the taxe
   */
  getTTCPrice(produit: Produit): number {
    return produit.price + this.getTaxPrice(produit);
  }

  /**
   * Get the tax associated to the produit
   *
   * @param produit produit to get tax
   * @returns the amount of the taxe
   */
  getTaxPrice(produit: Produit): number {
    return (
      Math.ceil(
        ((produit.price *
          this.getProduitTax(produit.category, produit.isImported)) /
          100) *
          20
      ) / 20
    );
  }

  private getProduitTax(
    category: ProduitCategoryEnum,
    isImported: boolean
  ): number {
    let result = produitCategoryTaxe[category] ?? this.DEFAULT_TAX;
    if (isImported) {
      result += 5;
    }
    return result;
  }

  /**
   * Get the sum of all ttc price
   *
   * @param produits liste of all produits to sum ttc price
   * @returns the amount of the taxe
   */
  sumTTCPrice(produits: Produit[]): number {
    return produits.reduce((sum, p) => sum + p.quantity * p.ttcPrice, 0);
  }

  /**
   * Get the sum of all tax price
   *
   * @param produits liste of all produits to sum ttc price
   * @returns the amount of the taxe
   */
  sumTaxPrice(produits: Produit[]): number {
    return produits.reduce(
      (sum, p) => sum + p.quantity * (p.ttcPrice - p.price),
      0
    );
  }
}
