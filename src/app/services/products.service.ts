import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "src/models/product.model";
import { ProductEditComponent } from "../components/product-edit/product-edit.component";

@Injectable({providedIn: "root"})
export class ProductsService {

  constructor(private http: HttpClient) {

  }

  getAllProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products");
  }

  getSelectedProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?selected=true");
  }

  getAvailableProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?available=true");
  }

  searchProducts(keyword: string): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + "/products?name_like=" + keyword);
  }

  select(product: Product):Observable<Product> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + "/products/" + product.id, product);
  }

  deleteProduct(product: Product):Observable<void> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.delete<void>(host + "/products/" + product.id);
  }

  save(product: Product):Observable<Product> {
    let host = environment.host;
    return this.http.post<Product>(host + "/products/", product);
  }

  getProduct(productId): Observable<Product> {
    let host = environment.host;
    return this.http.get<Product>(host + "/products/" + productId);
  }

  updateProduct(product: Product):Observable<Product> {
    let host = environment.host;
    console.log('HER => ', product);
    return this.http.put<Product>(host + "/products/" + product.id, product);
  }

}
