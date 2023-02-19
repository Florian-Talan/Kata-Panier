import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.css'],
})
export class ProduitCardComponent {
  @Input() produit!: Produit;
}
