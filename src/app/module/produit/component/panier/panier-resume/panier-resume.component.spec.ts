import { ProduitFactory } from './../../../factory/produit.factory';
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
      ProduitFactory.generate({ id: 1, price: 10, ttcPrice: 13 }),
      ProduitFactory.generate({ id: 2, price: 10, ttcPrice: 12 }),
    ];
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(component.totalTTC).toBe(25);
    expect(component.totalTaxes).toBe(5);
  });
});
