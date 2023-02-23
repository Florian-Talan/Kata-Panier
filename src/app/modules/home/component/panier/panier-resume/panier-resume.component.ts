import { Component, Input, OnChanges } from '@angular/core';
import { Produit } from '../../../model/produit.model';
import { TaxService } from '../../../service/tax.service';

@Component({
  selector: 'app-panier-resume',
  templateUrl: './panier-resume.component.html',
  styleUrls: ['./panier-resume.component.css'],
})
export class PanierResumeComponent implements OnChanges {
  @Input() produits!: Produit[];

  totalTaxes!: number;
  totalTTC!: number;

  constructor(private taxService: TaxService) {}

  ngOnChanges() {
    this.setPrices();
  }

  private setPrices() {
    this.totalTTC = this.taxService.sumTTCPrice(this.produits);
    this.totalTaxes = this.taxService.sumTaxPrice(this.produits);
  }
}
