import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { ProduitGenerator } from '../utils/produit.generator';
import { FilterProduitsByCategoryPipe } from './filter-produits-by-category.pipe';

describe('FilterProduitsByCategoryPipe', () => {
  let pipe: FilterProduitsByCategoryPipe;

  beforeEach(() => {
    pipe = new FilterProduitsByCategoryPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not filter if category is undefined', () => {
    /* GIVEN */
    const produits = [
      ProduitGenerator.generate({ id: 1, category: ProduitCategoryEnum.BOOKS }),
      ProduitGenerator.generate({
        id: 2,
        category: ProduitCategoryEnum.MEDECINE,
      }),
      ProduitGenerator.generate({
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
    const produits = [
      ProduitGenerator.generate({ id: 1, category: ProduitCategoryEnum.BOOKS }),
      ProduitGenerator.generate({ id: 2, category: ProduitCategoryEnum.BOOKS }),
      ProduitGenerator.generate({
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
