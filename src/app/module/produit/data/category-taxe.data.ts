import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';

type ProduitCategoryTaxe = {
    [key in ProduitCategoryEnum]: number;
}

export const produitCategoryTaxe: ProduitCategoryTaxe = {
    Food: 0,
    Medecine: 0,
    Books: 10,
    Parfum: 20,
    Electric: 20,
}