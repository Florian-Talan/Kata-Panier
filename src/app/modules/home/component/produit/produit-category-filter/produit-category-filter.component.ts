import { ProduitCategoryEnum } from '../../../model/enum/produit-category.enum';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-produit-category-filter',
  templateUrl: './produit-category-filter.component.html',
  styleUrls: ['./produit-category-filter.component.css'],
})
export class ProduitCategoryFilterComponent {
  list = Object.values(ProduitCategoryEnum);

  @Input() category?: ProduitCategoryEnum;
  @Output() categoryChange: EventEmitter<ProduitCategoryEnum> =
    new EventEmitter<ProduitCategoryEnum>();

  emit() {
    this.categoryChange.emit(this.category);
  }
}
