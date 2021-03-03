import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productFormGroup: FormGroup | null = null;
  submitted: boolean = false;
  productId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
  ) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId)
      .subscribe({
        next: product => {
          this.productFormGroup = this.fb.group({
            name: [product.name, Validators.required],
            price: [product.price, Validators.required],
            quantity: [product.quantity, Validators.required],
            selected: [product.selected, Validators.required],
            available: [product.available, Validators.required],
            id: [this.productId]
          });
        },
        error: err => {
          console.log('ERROR ==>', err);
        },
      });
  }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup.value)
      .subscribe({
        next: product => {
          console.log('Update success');
        },
        error: err => {
          console.log('ERROR ==>', err);
        },
      });
  }

}
