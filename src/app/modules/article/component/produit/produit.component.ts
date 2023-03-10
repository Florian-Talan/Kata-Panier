import { PanierService } from './../../service/panier.service';
import { path } from '../../resource/path.data';
import { ProduitService } from '../../service/produit.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from '../../model/produit.model';
import { ProduitCategoryEnum } from '../../model/enum/produit-category.enum';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  readonly pathPannier = path.panier.absolute;

  categoryFilter?: ProduitCategoryEnum;
  produits$!: Observable<Produit[]>;
  panier$!: BehaviorSubject<Produit[]>;

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    this.produits$ = this.produitService.getAll();
    this.panier$ = this.panierService.get();
  }
}
