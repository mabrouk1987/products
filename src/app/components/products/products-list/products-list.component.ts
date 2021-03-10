import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly dataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    console.log('HERERREE');
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCT, payload: product
    });
  }

  onDelete(product: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT, payload: product
    });
  }

  onEdit(product: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCT, payload: product
    });
  }

  onActionEvent($event) {
    this.productsEventEmitter.emit($event);
  }
}
