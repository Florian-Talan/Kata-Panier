import { PanierLineComponent } from './panier-line/panier-line.component';
import { RouterTestingModule } from '@angular/router/testing';
import { path } from '../../resource/path.data';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { PanierService } from '../../service/panier.service';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../../model/produit.model';
import { ProduitGenerator } from '../../utils/produit.generator';
import { PanierResumeComponent } from './panier-resume/panier-resume.component';
import { TaxService } from '../../service/tax.service';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;
  let compiled: HTMLElement;
  let panierSelected = new BehaviorSubject<Produit[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PanierComponent,
        PanierLineComponent,
        PanierResumeComponent,
      ],
      imports: [RouterTestingModule],
      providers: [
        TaxService,
        {
          provide: PanierService,
          useValue: { get: () => panierSelected },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to produit view', () => {
    const link = compiled.querySelector('a');
    expect(link?.attributes.getNamedItem('href')?.value).toBe(
      path.produit.absolute
    );
  });

  it('should display correct number of line', () => {
    /* GIVEN */
    panierSelected.next([
      ProduitGenerator.generate({ id: 1 }),
      ProduitGenerator.generate({ id: 2 }),
    ]);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    const cards = fixture.nativeElement.querySelectorAll('app-panier-line');
    expect(cards.length).toBe(2);
  });

  it('should display empty panier if empty', () => {
    /* GIVEN */
    panierSelected.next([]);
    /* WHEN */
    fixture.detectChanges();
    /* THEN */
    const cards = fixture.nativeElement.querySelectorAll('app-panier-line');
    expect(cards.length).toBe(0);
  });
});
