import { path } from './../../../../data/path.data';
import { PanierService } from './../../../../service/panier.service';
import { ProduitService } from './../../../../service/produit.service';
import { Component, OnInit } from '@angular/core';
import { ProduitCategoryEnum } from 'src/app/enum/produit-category.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from 'src/app/model/produit.model';

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
    this.setProduitObs();
    this.setPanierObs();
  }

  private setProduitObs() {
    this.produits$ = this.produitService.getAll();
  }

  private setPanierObs() {
    this.panier$ = this.panierService.get();
  }
}
