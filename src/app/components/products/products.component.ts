import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/models/product.model';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //products: Product[]|null = null;
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly dataStateEnum = DataStateEnum;
  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSearch(formValue: any) {
    this.products$ = this.productService.searchProducts(formValue.keyword).pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(product) {
    this.productService.select(product)
      .subscribe({
        next: data => {
          product.selected = data.selected;
        }
      })
  }

  onDelete(product) {
    let v = confirm("Etes vous sûr?");
    if (v) {
      this.productService.deleteProduct(product)
        .subscribe({
          next: data => {
            this.onGetAllProducts();
          }
        });
    }
  }

  onNewProduct() {
    this.router.navigate(['new-product']);
  }

  onEdit(product: Product) {
    this.router.navigate(['edit-product', product.id]);
  }

  onActionEvent($event) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: {
        this.onGetAllProducts();
        break;
      }
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: {
        this.onGetAvailableProducts();
        break;
      }
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: {
        this.onGetSelectedProducts();
        break;
      }
      case ProductActionsTypes.SEARCH_PRODUCTS: {
        this.onSearch($event.payload);
        break;
      }
      case ProductActionsTypes.NEW_PRODUCT: {
        this.onNewProduct();
        break;
      }
      case ProductActionsTypes.SELECT_PRODUCT: {
        this.onSelect($event.payload);
        break;
      }
      case ProductActionsTypes.EDIT_PRODUCT: {
        this.onEdit($event.payload);
        break;
      }
      case ProductActionsTypes.DELETE_PRODUCT: {
        this.onDelete($event.payload);
        break;
      }
      default: {
        console.log('DEFAULT');
        break;
      }
    }
  }

}
