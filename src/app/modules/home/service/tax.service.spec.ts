import { TestBed } from '@angular/core/testing';
import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { ProduitGenerator } from '../utils/produit.generator';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxService],
    });
    service = TestBed.inject(TaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate correct taxe by category', () => {
    /* GIVEN */
    const produit1 = ProduitGenerator.generate({
      id: 1,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.FOOD,
    });
    const produit2 = ProduitGenerator.generate({
      id: 2,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.MEDECINE,
    });
    const produit3 = ProduitGenerator.generate({
      id: 3,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.BOOKS,
    });
    const produit4 = ProduitGenerator.generate({
      id: 4,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.ELECTRIC,
    });
    const produit5 = ProduitGenerator.generate({
      id: 5,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.PARFUM,
    });
    const produit6 = ProduitGenerator.generate({
      id: 6,
      price: 10,
      isImported: false,
      category: 'toto' as unknown as ProduitCategoryEnum,
    });
    const produit7 = ProduitGenerator.generate({
      id: 6,
      price: 10,
      isImported: false,
      category: undefined as unknown as ProduitCategoryEnum,
    });

    /* WHEN */
    const taxe1 = service.getTaxPrice(produit1);
    const taxe2 = service.getTaxPrice(produit2);
    const taxe3 = service.getTaxPrice(produit3);
    const taxe4 = service.getTaxPrice(produit4);
    const taxe5 = service.getTaxPrice(produit5);
    const taxe6 = service.getTaxPrice(produit6);
    const taxe7 = service.getTaxPrice(produit7);

    /* THEN */
    expect(taxe1).toBe(0);
    expect(taxe2).toBe(0);
    expect(taxe3).toBe(1);
    expect(taxe4).toBe(2);
    expect(taxe5).toBe(2);
    expect(taxe6).toBe(2);
    expect(taxe7).toBe(2);
  });

  it('should round to + 0.05', () => {
    /* GIVEN */
    const produit1 = ProduitGenerator.generate({
      id: 1,
      price: 1.2,
      isImported: true,
      category: ProduitCategoryEnum.FOOD,
    });

    /* WHEN */
    const taxe1 = service.getTaxPrice(produit1);

    /* THEN */
    expect(taxe1).not.toBe(0.06);
    expect(taxe1).toBe(0.1);
  });

  it('should add imported taxe', () => {
    /* GIVEN */
    const produit1 = ProduitGenerator.generate({
      id: 1,
      price: 10,
      isImported: true,
      category: ProduitCategoryEnum.FOOD,
    });

    /* WHEN */
    const taxe1 = service.getTaxPrice(produit1);

    /* THEN */
    expect(taxe1).toBe(0.5);
  });
});
