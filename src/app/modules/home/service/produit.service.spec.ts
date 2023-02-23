import { of } from 'rxjs';
import { ProduitGenerator } from '../utils/produit.generator';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProduitService } from './produit.service';
import { ProduitCategoryEnum } from '../model/enum/produit-category.enum';
import { Produit } from '../model/produit.model';
import { HttpClient } from '@angular/common/http';
import { TaxService } from './tax.service';

describe('ProduitService', () => {
  let service: ProduitService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProduitService, TaxService],
    });
    service = TestBed.inject(ProduitService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
