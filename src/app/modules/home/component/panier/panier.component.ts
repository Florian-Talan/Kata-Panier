import { path } from '../../resource/path.data';

import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../service/panier.service';
import { Produit } from '../../model/produit.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  readonly pathProduit = path.produit.absolute;

  panier$!: BehaviorSubject<Produit[]>;

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.getPanier();
  }

  private getPanier() {
    this.panier$ = this.panierService.get();
  }
}
