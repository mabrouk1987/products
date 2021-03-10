import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionEvent, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;
  @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly dataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onActionEvent($event) {
    this.eventEmitter.emit($event);
  }

}
