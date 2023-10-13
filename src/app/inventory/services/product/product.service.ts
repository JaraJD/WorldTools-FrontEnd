import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ProductQueryModel } from "../../models/product/queries/product-query-model";
import { CreateProductCommandModel } from "../../models/product/commands/create-product-command-model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlQuery : string = 'https://localhost:7063/api/v1/product';
  private apiUrlCommand : string = 'https://localhost:7031/api/v1/product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductQueryModel[]> {
    const url = `${this.apiUrlQuery}/GetAllProducts`;
    return this.http.get<ProductQueryModel[]>(url);
  }

  getProductById(productId: string): Observable<ProductQueryModel> {
    const url = `${this.apiUrlQuery}/${productId}`;
    return this.http.get<ProductQueryModel>(url);
  }

  createProduct(product : CreateProductCommandModel): Observable<CreateProductCommandModel>{
    const url = `${this.apiUrlCommand}/register`;
    return this.http.post<CreateProductCommandModel>(url, product);
  }
}
