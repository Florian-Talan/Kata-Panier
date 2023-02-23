import { of } from 'rxjs';
import { ProduitGenerator } from '../utils/produit.generator';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProduitService } from './produit.service';
import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { Produit } from '../model/produit.model';
import { HttpClient } from '@angular/common/http';

describe('ProduitService', () => {
  let service: ProduitService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProduitService],
    });
    service = TestBed.inject(ProduitService);
    http = TestBed.inject(HttpClient);
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
      id: 1,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.MEDECINE,
    });
    const produit3 = ProduitGenerator.generate({
      id: 1,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.BOOKS,
    });
    const produit4 = ProduitGenerator.generate({
      id: 1,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.ELECTRIC,
    });
    const produit5 = ProduitGenerator.generate({
      id: 1,
      price: 10,
      isImported: false,
      category: ProduitCategoryEnum.PARFUM,
    });

    /* WHEN */
    const taxe1 = service.getTaxePrice(
      produit1.price,
      produit1.category,
      produit1.isImported
    );
    const taxe2 = service.getTaxePrice(
      produit2.price,
      produit2.category,
      produit2.isImported
    );
    const taxe3 = service.getTaxePrice(
      produit3.price,
      produit3.category,
      produit3.isImported
    );
    const taxe4 = service.getTaxePrice(
      produit4.price,
      produit4.category,
      produit4.isImported
    );
    const taxe5 = service.getTaxePrice(
      produit5.price,
      produit5.category,
      produit5.isImported
    );

    /* THEN */
    expect(taxe1).toBe(0);
    expect(taxe2).toBe(0);
    expect(taxe3).toBe(1);
    expect(taxe4).toBe(2);
    expect(taxe5).toBe(2);
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
    const taxe1 = service.getTaxePrice(
      produit1.price,
      produit1.category,
      produit1.isImported
    );

    /* THEN */
    expect(taxe1).toBe(0.5);
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
    const taxe1 = service.getTaxePrice(
      produit1.price,
      produit1.category,
      produit1.isImported
    );

    /* THEN */
    expect(taxe1).not.toBe(0.06);
    expect(taxe1).toBe(0.1);
  });

  it('should set TTC for each product', fakeAsync(() => {
    /* GIVEN */
    spyOn(http, 'get').and.returnValue(
      of([
        ProduitGenerator.generate({
          id: 1,
          price: 20,
          category: ProduitCategoryEnum.FOOD,
          isImported: false,
        }),
        ProduitGenerator.generate({
          id: 1,
          price: 10,
          category: ProduitCategoryEnum.FOOD,
          isImported: false,
        }),
      ])
    );

    /* WHEN */
    let result: Produit[] = [];
    service.getAll().subscribe((list) => (result = list));
    tick();

    expect(result.map((p) => p.ttcPrice)).toEqual([20, 10]);
  }));
});