import { TestBed } from '@angular/core/testing';

import { ProduitService } from './produit.service';

describe('ProduitService', () => {
  let service: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitService],
    });
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
