import { ProduitCategoryEnum } from './enum/produit-category.enum';

export interface Produit {
  readonly id: number;
  readonly productName?: string;
  readonly price: number;
  readonly quantity: number;
  readonly isImported: boolean;
  readonly category: ProduitCategoryEnum;
  readonly ttcPrice: number;
}
