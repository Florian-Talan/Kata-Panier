import { TestBed } from '@angular/core/testing';
import { ProduitGenerator } from '../utils/produit.generator';
import { Produit } from '../model/produit.model';

import { PanierService } from './panier.service';

describe('PanierService', () => {
  let service: PanierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanierService],
    });
    service = TestBed.inject(PanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add one produit in panier', () => {
    /* GIVEN */
    const produit = ProduitGenerator.generate({
      id: 1,
      productName: 'test1',
      quantity: 1,
    });
    /* WHEN */
    service.addOrUpdate(produit, 1);
    /* THEN */
    expect(service.get().value).toContain(produit);
  });

  it('should update one produit in panier', () => {
    /* GIVEN */
    let produit = ProduitGenerator.generate({
      id: 1,
      productName: 'test1',
      quantity: 2,
    });
    service.addOrUpdate(produit, 2);
    const newQuantity = 4;
    /* WHEN */
    service.addOrUpdate(produit, 4);
    /* THEN */
    const produits: Produit[] = service.get().value;
    expect(produits.length).toBe(1);
    expect(produits[0].quantity).toBe(newQuantity);
  });

  it('should delete one produit in panier', () => {
    /* GIVEN */
    const produit = ProduitGenerator.generate({
      id: 1,
      productName: 'test1',
      quantity: 2,
    });
    service.addOrUpdate(produit, 2);
    /* WHEN */
    service.delete(produit.id);
    /* THEN */
    const produits: Produit[] = service.get().value;
    expect(produits.length).toBe(0);
  });
});
