import { PanierService } from './../../../service/panier.service';
import { Component, Input } from '@angular/core';
import { Produit } from '../../../model/produit.model';

@Component({
  selector: 'app-panier-line',
  templateUrl: './panier-line.component.html',
  styleUrls: ['./panier-line.component.css'],
})
export class PanierLineComponent {
  @Input() produit!: Produit;

  constructor(private panierService: PanierService) {}

  removeFromPanier() {
    this.panierService.delete(this.produit.id);
  }
}
