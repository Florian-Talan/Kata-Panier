import { PanierService } from './../../../service/panier.service';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCardComponent } from './produit-card.component';
import { ProduitGenerator } from '../../../utils/produit.generator';
import { ProduitCategoryEnum } from '../../../model/enum/produit-category.enum';

describe('ProduitCardComponent', () => {
  let component: ProduitCardComponent;
  let fixture: ComponentFixture<ProduitCardComponent>;
  let compiled: HTMLElement;
  let inputQuantity: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let quantityCtrl: AbstractControl;
  let panierService: PanierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitCardComponent],
      providers: [PanierService],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitCardComponent);
    component = fixture.componentInstance;
    component.produit = ProduitGenerator.generate({ id: 1 });
    panierService = fixture.debugElement.injector.get(PanierService);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    inputQuantity = compiled.querySelector('input')!;
    submitButton = compiled.querySelector('button')!;
    quantityCtrl = component.cardForm.controls['quantity'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display category name ', () => {
    /* GIVEN */
    component.produit = {
      ...component.produit,
      category: ProduitCategoryEnum.ELECTRIC,
    };
    const pCategory = compiled.querySelector('[data-testid="category"]');
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(pCategory?.textContent).toContain(ProduitCategoryEnum.ELECTRIC);
  });

  it('should display quantity ', () => {
    /* GIVEN */
    const quantity = 2;
    component.produit = {
      ...component.produit,
      quantity,
    };
    const pQuantity = compiled.querySelector('[data-testid="quantity"]');
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(pQuantity?.textContent).toContain(quantity);
  });

  it('should display price ', () => {
    /* GIVEN */
    const ttcPrice = 5;
    component.produit = {
      ...component.produit,
      ttcPrice,
    };
    const pPrice = compiled.querySelector('[data-testid="price"]');
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(pPrice?.textContent).toContain(ttcPrice);
  });

  it('should match form value with input ', () => {
    /* GIVEN */
    quantityCtrl.setValue(2);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(inputQuantity.value).toBe('2');
  });

  it('should invalid form when quantity is falsy ', () => {
    /* GIVEN */
    component.produit = {
      ...component.produit,
      quantity: 3,
    };
    quantityCtrl.setValue(null);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(submitButton.disabled).toBeTrue();
    expect(quantityCtrl.valid).toBeFalse();
  });

  it('should invalid form when value <= 0 ', () => {
    /* GIVEN */
    component.produit = {
      ...component.produit,
      quantity: 3,
    };
    quantityCtrl.setValue(-1);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(submitButton.disabled).toBeTrue();
    expect(quantityCtrl.valid).toBeFalse();
  });

  it('should invalid form when value < quantity', () => {
    /* GIVEN */
    component.produit = {
      ...component.produit,
      quantity: 4,
    };
    quantityCtrl.setValue(5);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(submitButton.disabled).toBeTrue();
    expect(quantityCtrl.valid).toBeFalse();
  });

  it('should call addOrUpdate in panierService when submit', () => {
    /* GIVEN */
    spyOn(panierService, 'addOrUpdate');
    component.produit = {
      ...component.produit,
      quantity: 3,
    };
    quantityCtrl.setValue(2);
    /* WHEN */
    fixture.detectChanges();
    submitButton.click();
    /* THEN */
    expect(panierService.addOrUpdate).toHaveBeenCalledTimes(1);
    expect(panierService.addOrUpdate).toHaveBeenCalledWith(
      component.produit,
      quantityCtrl.value
    );
  });
});
