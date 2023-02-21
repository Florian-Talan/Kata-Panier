import { ProduitService } from './../../service/produit.service';
import { PanierService } from './../../service/panier.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitCardComponent } from './produit-card/produit-card.component';
import { ProduitCategoryFilterComponent } from './produit-category-filter/produit-category-filter.component';
import { path } from '../../data/path.data';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProduitComponent } from './produit.component';
import { BehaviorSubject, of } from 'rxjs';
import { FilterProduitsByCategoryPipe } from 'src/app/module/produit/pipe/filter-produits-by-category.pipe';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { Produit } from '../../model/produit.model';
import { ProduitFactory } from '../../data/factory/produit.factory';

describe('ProduitComponent', () => {
  let component: ProduitComponent;
  let fixture: ComponentFixture<ProduitComponent>;
  let panierSelected = new BehaviorSubject<Produit[]>([]);
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProduitComponent,
        ProduitCategoryFilterComponent,
        ProduitCardComponent,
        FilterProduitsByCategoryPipe,
      ],
      imports: [RouterTestingModule, SharedModule, ReactiveFormsModule],
      providers: [
        ProduitService,
        {
          provide: PanierService,
          useValue: { get: () => panierSelected },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of card', () => {
    /* GIVEN */
    component.produits$ = of<Produit[]>([
      ProduitFactory.generate({ id: 1 }),
      ProduitFactory.generate({ id: 2 }),
      ProduitFactory.generate({ id: 3 }),
    ]);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    const cards = fixture.nativeElement.querySelectorAll('app-produit-card');
    expect(cards.length).toBe(3);
  });

  it('should display number of product in basket', () => {
    /* GIVEN */
    panierSelected.next([
      ProduitFactory.generate({ id: 1 }),
      ProduitFactory.generate({ id: 2 }),
    ]);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    expect(compiled.querySelector('a')?.textContent).toContain('2');
  });

  it('should redirect to pannier view', () => {
    const link = compiled.querySelector('a');
    expect(link?.attributes.getNamedItem('href')?.value).toBe(
      path.panier.absolute
    );
  });
});
