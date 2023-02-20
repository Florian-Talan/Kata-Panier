import { PanierService } from './../../../service/panier.service';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCardComponent } from './produit-card.component';
import { ProduitCategoryEnum } from 'src/app/module/produit/enum/produit-category.enum';
import { ProduitFactory } from '../../../factory/produit.factory';

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
    component.produit = ProduitFactory.generate({ id: 1 });
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
    component.produit.category = ProduitCategoryEnum.ELECTRIC;
    const pCategory = compiled.querySelector('[data-testid="category"]');
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(pCategory?.textContent).toContain(ProduitCategoryEnum.ELECTRIC);
  });

  it('should display category name ', () => {
    /* GIVEN */
    const quantity = 2;
    component.produit.quantity = quantity;
    const pCategory = compiled.querySelector('[data-testid="quantity"]');
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(pCategory?.textContent).toContain(quantity);
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
    component.produit.quantity = 3;
    quantityCtrl.setValue(null);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(submitButton.disabled).toBeTrue();
    expect(quantityCtrl.valid).toBeFalse();
  });

  it('should invalid form when value <= 0 ', () => {
    /* GIVEN */
    component.produit.quantity = 3;
    quantityCtrl.setValue(-1);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(submitButton.disabled).toBeTrue();
    expect(quantityCtrl.valid).toBeFalse();
  });

  it('should invalid form when value < quantity', () => {
    /* GIVEN */
    component.produit.quantity = 4;
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
    component.produit.quantity = 3;
    quantityCtrl.setValue(2);
    /* WHEN */
    fixture.detectChanges();
    submitButton.click();
    /* THEN */
    expect(panierService.addOrUpdate).toHaveBeenCalledTimes(1);
    expect(panierService.addOrUpdate).toHaveBeenCalledWith({
      ...component.produit,
      quantity: quantityCtrl.value,
    });
  });
});
