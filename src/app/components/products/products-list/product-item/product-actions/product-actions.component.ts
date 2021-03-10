import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.css']
})
export class ProductActionsComponent implements OnInit {

  @Input() product?: Product;
  @Output() productActionsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productActionsEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCT, payload: product
    });
  }

  onDelete(product: Product) {
    this.productActionsEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT, payload: product
    });
  }

  onEdit(product: Product) {
    this.productActionsEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCT, payload: product
    });
  }

}
