import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { Produit } from '../model/produit.model';

export class ProduitGenerator {
  static generate(values?: Partial<Produit>): Produit {
    return {
      id: 1,
      productName: 'defaultName',
      price: 1,
      ttcPrice: 1,
      quantity: 1,
      isImported: false,
      category: ProduitCategoryEnum.BOOKS,
      ...values,
    };
  }
}
