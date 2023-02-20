import { ProduitCategoryEnum } from '../enum/produit-category.enum';
import { Produit } from '../model/produit.model';

export class ProduitFactory {
  static generate(values?: Partial<Produit>): Produit {
    return {
      id: 1,
      productName: 'defaultName',
      price: 1,
      quantity: 1,
      isImported: false,
      category: ProduitCategoryEnum.BOOKS,
      ...values,
    };
  }
}
