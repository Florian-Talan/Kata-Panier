import { PanierService } from './../../../../service/panier.service';
import { Component, Input, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.css'],
})
export class ProduitCardComponent implements OnInit {
  @Input() produit!: Produit;

  cardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  addInPanier() {
    this.panierService.addOrUpdate({
      ...this.produit,
      quantity: this.getQuantitySelected(),
    });
  }

  private initForm() {
    this.cardForm = this.formBuilder.group({
      quantity: [
        0,
        [
          Validators.required,
          Validators.min(1),
          (control: AbstractControl) =>
            Validators.max(this.produit.quantity)(control),
        ],
      ],
    });
  }

  private getQuantitySelected(): number {
    return this.cardForm.controls['quantity'].value;
  }
}
