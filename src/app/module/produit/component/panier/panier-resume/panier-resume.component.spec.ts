import { ProduitFactory } from '../../../data/factory/produit.factory';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierResumeComponent } from './panier-resume.component';

describe('PanierResumeComponent', () => {
  let component: PanierResumeComponent;
  let fixture: ComponentFixture<PanierResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierResumeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sum price', () => {
    /* GIVEN */
    component.produits = [
      ProduitFactory.generate({ id: 1, quantity: 2, price: 10, ttcPrice: 13 }),
      ProduitFactory.generate({ id: 2, quantity: 1, price: 10, ttcPrice: 12 }),
    ];
    /* WHEN */
    component.ngOnChanges();
    /* THEN */
    expect(component.totalTTC).toBe(38);
    expect(component.totalTaxes).toBe(8);
  });
});
