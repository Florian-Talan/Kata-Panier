import { ProduitCategoryEnum } from '../enum/produit-category.enum';

export interface Produit {
  id: number;
  productName?: string;
  price: number;
  quantity: number;
  isImported: boolean;
  category: ProduitCategoryEnum;
  ttcPrice: number;
}
