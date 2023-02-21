import { PanierService } from './../../../service/panier.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduitFactory } from '../../../data/factory/produit.factory';

import { PanierLineComponent } from './panier-line.component';

describe('PanierLineComponent', () => {
  let component: PanierLineComponent;
  let fixture: ComponentFixture<PanierLineComponent>;
  let panierService: PanierService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierLineComponent],
      providers: [
        {
          provide: PanierService,
          useValue: {
            delete: (id: number) => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierLineComponent);
    component = fixture.componentInstance;
    component.produit = ProduitFactory.generate();
    panierService = fixture.debugElement.injector.get(PanierService);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove service panier function', () => {
    /* GIVEN */
    spyOn(panierService, 'delete');
    const id = 2;
    component.produit.id = id;
    /* WHEN */
    fixture.detectChanges();
    const btn = compiled.querySelector('button');
    btn?.click();
    /* THEN */
    expect(panierService.delete).toHaveBeenCalledTimes(1);
    expect(panierService.delete).toHaveBeenCalledWith(2);
  });
});
