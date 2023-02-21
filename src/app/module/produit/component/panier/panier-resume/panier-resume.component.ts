import { Component, Input, OnChanges } from '@angular/core';
import { Produit } from '../../../model/produit.model';

@Component({
  selector: 'app-panier-resume',
  templateUrl: './panier-resume.component.html',
  styleUrls: ['./panier-resume.component.css'],
})
export class PanierResumeComponent implements OnChanges {
  @Input() produits!: Produit[] | null;

  totalTaxes!: number;
  totalTTC!: number;

  ngOnChanges() {
    this.sumPrices();
  }

  private sumPrices() {
    this.totalTTC = this.produits?.reduce((sum, p) => sum + (p.quantity * p.ttcPrice), 0) || 0;
    this.totalTaxes =
      this.produits?.reduce((sum, p) => sum + (p.quantity * (p.ttcPrice - p.price)), 0) || 0;
  }
}
