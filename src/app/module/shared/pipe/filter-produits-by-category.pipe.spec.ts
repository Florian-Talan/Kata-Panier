import { ProduitCategoryEnum } from './../../../enum/produit-category.enum';
import { ProduitFactory } from './../../../factory/produit.factory';
import { FilterProduitsByCategoryPipe } from './filter-produits-by-category.pipe';

describe('FilterProduitsByCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProduitsByCategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if products is null', () => {
    /* GIVEN */
    const pipe = new FilterProduitsByCategoryPipe();

    /* WHEN */
    const result = pipe.transform(null);

    /* THEN */
    expect(result).toBe(null);
  });

  it('should not filter if category is undefined', () => {
    /* GIVEN */
    const pipe = new FilterProduitsByCategoryPipe();
    const produits = [
      ProduitFactory.generate({ id: 1, category: ProduitCategoryEnum.BOOKS }),
      ProduitFactory.generate({
        id: 2,
        category: ProduitCategoryEnum.MEDECINE,
      }),
      ProduitFactory.generate({
        id: 3,
        category: ProduitCategoryEnum.ELECTRIC,
      }),
    ];

    /* WHEN */
    const result = pipe.transform(produits);

    /* THEN */
    expect(result?.length).toBe(3);
    expect(result?.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it('should transform value', () => {
    /* GIVEN */
    const pipe = new FilterProduitsByCategoryPipe();
    const produits = [
      ProduitFactory.generate({ id: 1, category: ProduitCategoryEnum.BOOKS }),
      ProduitFactory.generate({ id: 2, category: ProduitCategoryEnum.BOOKS }),
      ProduitFactory.generate({
        id: 3,
        category: ProduitCategoryEnum.ELECTRIC,
      }),
    ];

    /* WHEN */
    const result = pipe.transform(produits, ProduitCategoryEnum.BOOKS);

    /* THEN */
    expect(result?.length).toBe(2);
    expect(result?.map((p) => p.id)).toEqual([1, 2]);
  });
});
