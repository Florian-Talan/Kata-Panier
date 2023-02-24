import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from '../model/produit.model';

@Pipe({
  name: 'filterProduitsByCategory',
})
export class FilterProduitsByCategoryPipe implements PipeTransform {
  transform(produits: Produit[], category?: ProduitCategoryEnum): Produit[] {
    if (category) {
      return produits.filter((p) => p.category === category);
    }
    return produits;
  }
}
