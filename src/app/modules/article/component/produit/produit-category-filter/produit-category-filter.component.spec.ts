import { ProduitCategoryEnum } from '../../../model/enum/produit-category.enum';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../../shared/shared.module';

import { ProduitCategoryFilterComponent } from './produit-category-filter.component';

describe('ProduitCategoryFilterComponent', () => {
  let component: ProduitCategoryFilterComponent;
  let fixture: ComponentFixture<ProduitCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitCategoryFilterComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when value change', () => {
    /* WHEN */
    spyOn(component.categoryChange, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const select = compiled.querySelector('select')!;
    for (let i = 0; i < select.options.length; i++) {
      const opt = select.options[i];
      if (opt.text === ProduitCategoryEnum.MEDECINE) {
        select.value = opt.value;
      }
    }
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    /* THEN */
    expect(component.categoryChange.emit).toHaveBeenCalledTimes(1);
    expect(component.categoryChange.emit).toHaveBeenCalledWith(
      ProduitCategoryEnum.MEDECINE
    );
  });
});
