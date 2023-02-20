import { TestBed } from '@angular/core/testing';
import { ProduitFactory } from '../factory/produit.factory';
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
    const produit = ProduitFactory.generate({ id: 1, productName: 'test1' });
    /* WHEN */
    service.addOrUpdate(produit);
    /* THEN */
    expect(service.get().value).toContain(produit);
  });

  it('should update one produit in panier', () => {
    /* GIVEN */
    const produit = ProduitFactory.generate({
      id: 1,
      productName: 'test1',
      quantity: 2,
    });
    service.addOrUpdate(produit);
    const newQuantity = 4;
    produit.quantity = newQuantity;
    /* WHEN */
    service.addOrUpdate(produit);
    /* THEN */
    const produits: Produit[] = service.get().value;
    expect(produits.length).toBe(1);
    expect(produits[0].quantity).toBe(newQuantity);
  });

  it('should delete one produit in panier', () => {
    /* GIVEN */
    const produit = ProduitFactory.generate({
      id: 1,
      productName: 'test1',
      quantity: 2,
    });
    service.addOrUpdate(produit);
    /* WHEN */
    service.delete(produit.id);
    /* THEN */
    const produits: Produit[] = service.get().value;
    expect(produits.length).toBe(0);
  });
});
